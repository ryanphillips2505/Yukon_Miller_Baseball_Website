import "server-only";

import { del, get, list, put } from "@vercel/blob";
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";

export type MinutesFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

export const MAX_MINUTES_BYTES = 4 * 1024 * 1024;
const BLOB_PREFIX = "minutes/";

function localDir() {
  return process.env.VERCEL
    ? path.join("/tmp", "yukon-minutes")
    : path.join(process.cwd(), "data", "minutes");
}

export function minutesUsesBlob() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

export function safeMinutesName(raw: string) {
  const base = raw.replace(/\\/g, "/").split("/").pop()?.trim() ?? "";
  if (!base || base === "." || base === "..") return null;
  const cleaned = base.replace(/[^\w.\- ()']/g, "").trim();
  if (!cleaned) return null;
  const named = /\.pdf$/i.test(cleaned) ? cleaned : `${cleaned}.pdf`;
  if (named === ".pdf" || named.length > 160) return null;
  return named;
}

export async function isPdfBuffer(bytes: Uint8Array) {
  return (
    bytes.length >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  );
}

async function listLocal(): Promise<MinutesFile[]> {
  const dir = localDir();
  await mkdir(dir, { recursive: true });
  const names = await readdir(dir);
  const files = await Promise.all(
    names
      .filter((name) => name.toLowerCase().endsWith(".pdf"))
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

async function listBlob(): Promise<MinutesFile[]> {
  const result = await list({ prefix: BLOB_PREFIX });
  return result.blobs
    .map((blob) => ({
      name: blob.pathname.slice(BLOB_PREFIX.length),
      size: blob.size,
      uploadedAt: blob.uploadedAt.toISOString(),
    }))
    .filter((file) => file.name && file.name.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function listMinutes(): Promise<MinutesFile[]> {
  return minutesUsesBlob() ? listBlob() : listLocal();
}

export async function saveMinutes(name: string, bytes: Uint8Array) {
  if (minutesUsesBlob()) {
    await put(`${BLOB_PREFIX}${name}`, Buffer.from(bytes), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/pdf",
      cacheControlMaxAge: 60,
    });
    return;
  }

  const dir = localDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
}

export async function readMinutes(name: string) {
  if (minutesUsesBlob()) {
    const result = await get(`${BLOB_PREFIX}${name}`, { access: "private" });
    if (!result || result.statusCode !== 200) return null;
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

  try {
    const buf = await readFile(path.join(localDir(), name));
    return new Uint8Array(buf);
  } catch {
    return null;
  }
}

export async function deleteMinutes(name: string) {
  if (minutesUsesBlob()) {
    await del(`${BLOB_PREFIX}${name}`);
    return;
  }
  await unlink(path.join(localDir(), name));
}
