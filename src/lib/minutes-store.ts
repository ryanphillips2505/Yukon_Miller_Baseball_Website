import "server-only";

import { del, get, list, put } from "@vercel/blob";
import { exec } from "dugite";
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import { MINUTES_DEPLOY_KEY } from "@/lib/minutes-deploy-key";

export type MinutesFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

export const MAX_MINUTES_BYTES = 4.5 * 1024 * 1024;
const BLOB_PREFIX = "minutes/";
const FILES_DIR = "files";
const REMOTE = "git@github.com:ryanphillips2505/yukon-miller-minutes.git";

const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

function localDir() {
  return path.join(process.cwd(), "data", "minutes");
}

function workDir() {
  return process.env.VERCEL
    ? "/tmp/yukon-minutes-repo"
    : path.join(process.cwd(), ".minutes-repo");
}

function keyPath() {
  return process.env.VERCEL
    ? "/tmp/yukon-minutes-deploy"
    : path.join(process.cwd(), ".minutes-deploy");
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

async function listBlob(): Promise<MinutesFile[]> {
  const result = await list({ prefix: BLOB_PREFIX });
  return result.blobs
    .map((blob) => ({
      name: blob.pathname.slice(BLOB_PREFIX.length),
      size: blob.size,
      uploadedAt: blob.uploadedAt.toISOString(),
    }))
    .filter((file) => file.name && ALLOWED_EXT.has(path.posix.extname(file.name).toLowerCase()))
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

function sshEnv() {
  const wrapper = path.join(process.cwd(), "src/lib/minutes-ssh.mjs");
  return {
    GIT_SSH_COMMAND: `${process.execPath} ${wrapper} -i ${keyPath()}`,
    GIT_AUTHOR_NAME: "Yukon Minutes Vault",
    GIT_AUTHOR_EMAIL: "minutes@yukonbaseball.com",
    GIT_COMMITTER_NAME: "Yukon Minutes Vault",
    GIT_COMMITTER_EMAIL: "minutes@yukonbaseball.com",
  };
}

async function runGit(args: string[], cwd: string) {
  const result = await exec(args, cwd, { env: sshEnv() });
  if (result.exitCode !== 0) {
    throw new Error(String(result.stderr || `git ${args.join(" ")} failed`));
  }
  return result;
}

async function prepareRepo() {
  await writeFile(keyPath(), MINUTES_DEPLOY_KEY, { mode: 0o600 });
  const dir = workDir();
  try {
    await stat(path.join(dir, ".git"));
    await runGit(["pull", "--rebase", "origin", "main"], dir);
  } catch {
    await mkdir(path.dirname(dir), { recursive: true });
    await runGit(["clone", "--depth", "1", REMOTE, dir], path.dirname(dir));
  }
  await mkdir(path.join(dir, FILES_DIR), { recursive: true });
  return dir;
}

async function listGit(): Promise<MinutesFile[]> {
  const dir = await prepareRepo();
  const folder = path.join(dir, FILES_DIR);
  const names = await readdir(folder);
  const files = await Promise.all(
    names
      .filter((name) => ALLOWED_EXT.has(path.posix.extname(name).toLowerCase()))
      .map(async (name) => {
        const info = await stat(path.join(folder, name));
        return {
          name,
          size: info.size,
          uploadedAt: info.mtime.toISOString(),
        };
      }),
  );
  return files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

async function saveGit(name: string, bytes: Uint8Array) {
  const dir = await prepareRepo();
  await writeFile(path.join(dir, FILES_DIR, name), bytes);
  await runGit(["add", `${FILES_DIR}/${name}`], dir);
  const result = await exec(["commit", "-m", `Upload ${name}`], dir, {
    env: sshEnv(),
  });
  if (result.exitCode !== 0 && !String(result.stdout).includes("nothing to commit")) {
    const text = `${result.stdout}\n${result.stderr}`;
    if (!text.includes("nothing to commit")) {
      throw new Error(String(result.stderr || "Could not save that file."));
    }
  }
  await runGit(["push", "origin", "HEAD:main"], dir);
}

async function readGit(name: string) {
  const dir = await prepareRepo();
  try {
    const buf = await readFile(path.join(dir, FILES_DIR, name));
    return new Uint8Array(buf);
  } catch {
    return null;
  }
}

async function deleteGit(name: string) {
  const dir = await prepareRepo();
  await unlink(path.join(dir, FILES_DIR, name));
  await runGit(["add", "-A", `${FILES_DIR}/${name}`], dir);
  await runGit(["commit", "-m", `Remove ${name}`], dir);
  await runGit(["push", "origin", "HEAD:main"], dir);
}

export async function listMinutes(): Promise<MinutesFile[]> {
  if (minutesUsesBlob()) return listBlob();
  if (process.env.VERCEL) return listGit();
  return listLocal();
}

export async function saveMinutes(name: string, bytes: Uint8Array) {
  if (minutesUsesBlob()) {
    await put(`${BLOB_PREFIX}${name}`, Buffer.from(bytes), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType:
        name.toLowerCase().endsWith(".pdf")
          ? "application/pdf"
          : "application/octet-stream",
      cacheControlMaxAge: 60,
    });
    return;
  }

  if (process.env.VERCEL) {
    await saveGit(name, bytes);
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

  if (process.env.VERCEL) return readGit(name);

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
  if (process.env.VERCEL) {
    await deleteGit(name);
    return;
  }
  await unlink(path.join(localDir(), name));
}
