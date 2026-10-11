"use client";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore } from "react";

function prefersExternalPdf() {
  const ua = navigator.userAgent;
  const iPadOs =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || iPadOs;
}

function useExternalPdfViewer() {
  return useSyncExternalStore(
    () => () => {},
    prefersExternalPdf,
    () => false,
  );
}

export function minutesFileUrl(name: string, inline = false) {
  const params = new URLSearchParams({ name });
  if (inline) params.set("inline", "1");
  return `/api/minutes/file?${params.toString()}`;
}

function keepDialogFocus(frame: HTMLIFrameElement) {
  frame.blur();
  const popup = frame.closest("[data-slot='dialog-content']");
  if (popup instanceof HTMLElement) popup.focus();
}

export function MinutesPdfViewer({ name }: { name: string }) {
  const externalViewer = useExternalPdfViewer();
  const inlineUrl = minutesFileUrl(name, true);
  const downloadUrl = minutesFileUrl(name);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (externalViewer) return;
    // Chrome's PDF plugin holds keyboard focus inside the frame, so Escape
    // never reaches the dialog. Move focus back while the mouse can still scroll.
    const recover = () => {
      const frame = frameRef.current;
      if (!frame || document.activeElement !== frame) return;
      keepDialogFocus(frame);
    };
    const onWindowBlur = () => {
      window.setTimeout(recover, 0);
    };
    window.addEventListener("blur", onWindowBlur);
    const interval = window.setInterval(recover, 150);
    return () => {
      window.removeEventListener("blur", onWindowBlur);
      window.clearInterval(interval);
    };
  }, [externalViewer]);

  return (
    <DialogContent
      showCloseButton={false}
      overlayClassName="bg-black/80 supports-backdrop-filter:backdrop-blur-sm"
      className={cn(
        "flex max-w-none flex-col gap-0 overflow-hidden bg-zinc-950 p-0 text-white ring-white/15",
        "inset-x-2 top-[max(0.5rem,env(safe-area-inset-top))] bottom-[max(0.5rem,env(safe-area-inset-bottom))] h-auto w-auto translate-x-0 translate-y-0",
        "sm:inset-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:h-[min(88dvh,52rem)] sm:w-[min(72rem,calc(100%-3rem))] sm:max-w-none sm:-translate-x-1/2 sm:-translate-y-1/2",
      )}
    >
      <DialogHeader className="shrink-0 flex-row items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-4">
        <DialogTitle className="min-w-0 truncate text-left text-sm tracking-wide text-white uppercase sm:text-base">
          {name}
        </DialogTitle>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={downloadUrl}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 border-white/15 px-3 text-xs uppercase",
            )}
          >
            Download
          </a>
          <DialogClose
            aria-label="Close"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 text-white hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-red-500/50 focus-visible:outline-none"
          >
            <X className="size-5" />
          </DialogClose>
        </div>
      </DialogHeader>
      <DialogDescription className="sr-only">
        Preview of {name}. Close this dialog to return to the minutes list.
      </DialogDescription>
      <div className="min-h-0 flex-1 bg-zinc-900">
        {externalViewer ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="max-w-sm text-sm leading-6 text-zinc-300">
              This browser opens PDFs in its own viewer so the pages stay sharp
              and easy to scroll.
            </p>
            <a
              href={inlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-11 px-5 text-xs uppercase")}
            >
              Open PDF
            </a>
          </div>
        ) : (
          <iframe
            ref={frameRef}
            title={name}
            src={inlineUrl}
            className="h-full w-full border-0 bg-white"
            onFocus={(event) => keepDialogFocus(event.currentTarget)}
          />
        )}
      </div>
    </DialogContent>
  );
}
