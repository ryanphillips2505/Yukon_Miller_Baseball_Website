"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";

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

export function MinutesVault({
  initialFiles,
  canAdmin,
}: {
  initialFiles: MinutesFile[];
  canAdmin: boolean;
}) {
  const router = useRouter();
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  async function refreshFiles() {
    const response = await fetch("/api/minutes");
    const data = (await response.json()) as {
      files?: MinutesFile[];
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error || "Could not refresh the file list.");
    }
    setFiles(data.files ?? []);
  }

  async function uploadDirect(file: File) {
    const started = await fetch("/api/minutes/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: file.name, size: file.size }),
    });
    const startData = (await started.json()) as {
      url?: string;
      contentType?: string;
      error?: string;
    };
    if (started.status === 503) return false;
    if (!started.ok || !startData.url) {
      throw new Error(startData.error || "Upload failed.");
    }

    const stored = await fetch(startData.url, {
      method: "PUT",
      headers: {
        "Content-Type": startData.contentType || file.type || "application/pdf",
      },
      body: file,
    });
    if (!stored.ok) {
      const detail = await stored.text().catch(() => "");
      throw new Error(
        detail
          ? `Upload failed (${stored.status}).`
          : "Upload failed. Try again.",
      );
    }
    await refreshFiles();
    return true;
  }

  async function uploadThroughServer(file: File) {
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/minutes", { method: "POST", body });
    const data = (await response.json()) as {
      files?: MinutesFile[];
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error || "Upload failed.");
    }
    setFiles(data.files ?? []);
  }

  async function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 80 * 1024 * 1024) {
      setError("File must be 80 MB or smaller.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const usedDirect = await uploadDirect(file);
      if (!usedDirect) await uploadThroughServer(file);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed. Try again.");
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
            {canAdmin
              ? "Upload PDF or Word files up to 80 MB. Downloads stay behind the password."
              : "View and download minutes. Only an administrator can add or remove files."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canAdmin ? (
            <label
              className={cn(
                buttonVariants(),
                "h-10 cursor-pointer px-4 uppercase",
                uploading && "pointer-events-none opacity-50",
              )}
            >
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                disabled={uploading}
                onChange={onUpload}
              />
            </label>
          ) : null}
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

      {files.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500">
          {canAdmin
            ? "No minutes uploaded yet. Use Upload to add the first file."
            : "No minutes uploaded yet."}
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
                {canAdmin ? (
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
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
