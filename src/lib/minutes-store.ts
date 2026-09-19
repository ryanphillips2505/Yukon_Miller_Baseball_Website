import "server-only";

import { del, get, list, put } from "@vercel/blob";
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import { ensureMinutesBlobStoreId } from "@/lib/minutes-blob";
import {
  deleteGithubMinutes,
  listGithubMinutes,
  minutesUsesGithub,
  readGithubMinutes,
  saveGithubMinutes,
} from "@/lib/minutes-github";

export type MinutesFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

export const MAX_MINUTES_BYTES = 4.5 * 1024 * 1024;
const BLOB_PREFIX = "minutes/";
const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

function localDir() {
  return path.join(process.cwd(), "data", "minutes");
}

export function minutesUsesBlob() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_STORE_ID ||
      (process.env.VERCEL && process.env.VERCEL_OIDC_TOKEN),
  );
}

export function safeMinutesName(raw: string) {
  const base = raw.replace(/\\/g, "/").split("/").pop()?.trim() ?? "";
  if (!base || base === "." || base === "..") return null;
  const cleaned = base.replace(/[^\w.\- ()']/g, "").trim();
  if (!cleaned) return null;
  const ext = path.posix.extname(cleaned).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return null;
  const named = cleaned.slice(0, 160);
  if (named.length <= ext.length) return null;
  return named;
}

export async function isAllowedDocument(name: string, bytes: Uint8Array) {
  const ext = path.posix.extname(name).toLowerCase();
  if (ext === ".pdf") {
    const start = Buffer.from(bytes.subarray(0, 1024)).toString("latin1");
    return start.includes("%PDF");
  }
  if (ext === ".docx") {
    return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b;
  }
  if (ext === ".doc") {
    return (
      bytes.length >= 4 &&
      bytes[0] === 0xd0 &&
      bytes[1] === 0xcf &&
      bytes[2] === 0x11 &&
      bytes[3] === 0xe0
    );
  }
  return false;
}

async function listLocal(): Promise<MinutesFile[]> {
  const dir = localDir();
  await mkdir(dir, { recursive: true });
  const names = await readdir(dir);
  const files = await Promise.all(
    names
      .filter((name) => ALLOWED_EXT.has(path.posix.extname(name).toLowerCase()))
      .map(async (name) => {
        const info = await stat(path.join(dir, name));
        return {
          name,
          size: info.size,
          uploadedAt: info.mtime.toISOString(),
        };
      }),
  );
  return files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

async function blobOptions() {
  const storeId = await ensureMinutesBlobStoreId();
  return storeId ? { storeId } : {};
}

async function listBlob(): Promise<MinutesFile[]> {
  const result = await list({ prefix: BLOB_PREFIX, ...(await blobOptions()) });
  return result.blobs
    .map((blob) => ({
      name: blob.pathname.slice(BLOB_PREFIX.length),
      size: blob.size,
      uploadedAt: blob.uploadedAt.toISOString(),
    }))
    .filter(
      (file) =>
        file.name && ALLOWED_EXT.has(path.posix.extname(file.name).toLowerCase()),
    )
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function listMinutes(): Promise<MinutesFile[]> {
  if (minutesUsesBlob()) {
    try {
      return await listBlob();
    } catch {
      if (minutesUsesGithub()) return listGithubMinutes();
      throw new Error("Could not load minutes.");
    }
  }
  if (minutesUsesGithub()) return listGithubMinutes();
  return listLocal();
}

export async function saveMinutes(name: string, bytes: Uint8Array) {
  if (minutesUsesBlob()) {
    try {
      await put(`${BLOB_PREFIX}${name}`, Buffer.from(bytes), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: name.toLowerCase().endsWith(".pdf")
          ? "application/pdf"
          : "application/octet-stream",
        cacheControlMaxAge: 60,
        ...(await blobOptions()),
      });
      return;
    } catch (error) {
      if (minutesUsesGithub()) {
        await saveGithubMinutes(name, bytes);
        return;
      }
      const detail = error instanceof Error ? error.message : "storage error";
      throw new Error(`Could not save that file (${detail}).`);
    }
  }

  if (minutesUsesGithub()) {
    await saveGithubMinutes(name, bytes);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error("Minutes storage is not available on this deployment.");
  }

  const dir = localDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
}

export async function readMinutes(name: string) {
  if (minutesUsesBlob()) {
    try {
      const result = await get(`${BLOB_PREFIX}${name}`, {
        access: "private",
        ...(await blobOptions()),
      });
      if (result && result.statusCode === 200) {
        const chunks: Uint8Array[] = [];
        const reader = result.stream.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) chunks.push(value);
        }
        const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const bytes = new Uint8Array(total);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.length;
        }
        return bytes;
      }
    } catch {
      // Fall through to GitHub or local.
    }
  }

  if (minutesUsesGithub()) return readGithubMinutes(name);

  try {
    const buf = await readFile(path.join(localDir(), name));
    return new Uint8Array(buf);
  } catch {
    return null;
  }
}

export async function deleteMinutes(name: string) {
  if (minutesUsesBlob()) {
    try {
      await del(`${BLOB_PREFIX}${name}`, await blobOptions());
      return;
    } catch {
      if (!minutesUsesGithub()) throw new Error("Could not remove that file.");
    }
  }
  if (minutesUsesGithub()) {
    await deleteGithubMinutes(name);
    return;
  }
  await unlink(path.join(localDir(), name));
}
