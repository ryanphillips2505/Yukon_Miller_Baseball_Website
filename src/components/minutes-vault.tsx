"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";

type MinutesFile = {
  name: string;
  size: number;
  uploadedAt: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function MinutesVault() {
  const router = useRouter();
  const [files, setFiles] = useState<MinutesFile[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await fetch("/api/minutes");
    if (response.status === 401) {
      router.refresh();
      return;
    }
    const data = (await response.json()) as {
      files?: MinutesFile[];
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error || "Could not load minutes.");
    }
    setFiles(data.files ?? []);
  }, [router]);

  useEffect(() => {
    load()
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Could not load minutes.");
      })
      .finally(() => setLoading(false));
  }, [load]);

  async function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/minutes", { method: "POST", body });
      const data = (await response.json()) as {
        files?: MinutesFile[];
        error?: string;
      };
      if (!response.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      setFiles(data.files ?? []);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  async function onRemove(name: string) {
    setRemoving(name);
    setError("");
    try {
      const response = await fetch(
        `/api/minutes/file?name=${encodeURIComponent(name)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error || "Could not remove that file.");
        return;
      }
      setFiles((current) => current.filter((file) => file.name !== name));
    } catch {
      setError("Could not remove that file.");
    } finally {
      setRemoving(null);
    }
  }

  async function onLock() {
    await fetch("/api/minutes/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Minutes library
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Upload PDFs. Downloads stay behind the password.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label
            className={cn(
              buttonVariants(),
              "h-10 cursor-pointer px-4 uppercase",
              uploading && "pointer-events-none opacity-50",
            )}
          >
            {uploading ? "Uploading…" : "Upload PDF"}
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              disabled={uploading}
              onChange={onUpload}
            />
          </label>
          <button
            type="button"
            onClick={onLock}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 border-white/15 px-4 uppercase",
            )}
          >
            Lock
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      {loading ? (
        <p className="mt-8 text-sm text-zinc-500">Loading minutes…</p>
      ) : files.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500">
          No minutes uploaded yet. Use Upload PDF to add the first file.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-white/8">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="text-sm text-white">{file.name}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {formatDate(file.uploadedAt)} · {formatSize(file.size)}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/api/minutes/file?name=${encodeURIComponent(file.name)}`}
                  className={cn(buttonVariants(), "h-9 px-3 text-xs uppercase")}
                >
                  Download
                </a>
                <button
                  type="button"
                  disabled={removing === file.name}
                  onClick={() => onRemove(file.name)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-9 border-white/15 px-3 text-xs uppercase",
                  )}
                >
                  {removing === file.name ? "Removing…" : "Remove"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
