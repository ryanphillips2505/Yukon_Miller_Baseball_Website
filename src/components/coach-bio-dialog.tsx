"use client";

import { PhotoSlot } from "@/components/photo-slot";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  adjacentCoach,
  bioLine,
  coaches,
  type Coach,
} from "@/lib/coaches";
import { ChevronDown, ChevronUp, XIcon } from "lucide-react";

type CoachBioDialogProps = {
  coach: Coach | null;
  onClose: () => void;
  onSelect: (coach: Coach) => void;
};

function BioStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/8 bg-black/40 px-3 py-3">
      <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </p>
      <p className="font-heading mt-1.5 text-xl leading-none tracking-wide text-white uppercase sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function BioBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{value}</p>
    </div>
  );
}

export function CoachBioDialog({
  coach,
  onClose,
  onSelect,
}: CoachBioDialogProps) {
  const previous = coach ? adjacentCoach(coach.id, -1) : undefined;
  const next = coach ? adjacentCoach(coach.id, 1) : undefined;
  const slot = coach
    ? coaches.findIndex((entry) => entry.id === coach.id) + 1
    : 0;
  const bio = coach?.bio;

  return (
    <Dialog open={coach !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/80 supports-backdrop-filter:backdrop-blur-sm"
        className="max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-1.5rem)] overflow-y-auto border border-white/12 bg-[#0a0a0c] p-0 text-white ring-0 sm:max-w-xl"
        onKeyDown={(event) => {
          if (!coach) return;
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            if (previous) onSelect(previous);
          }
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            if (next) onSelect(next);
          }
        }}
      >
        {coach ? (
          <>
            <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#1a0a0d_0%,#0a0a0c_100%)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,16,46,0.28),transparent_48%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
              <DialogClose
                className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white transition-colors hover:border-white/35 hover:bg-black/80"
                aria-label="Close coach bio"
              >
                <XIcon className="size-4" />
              </DialogClose>
              <div className="relative grid gap-5 px-5 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-end sm:px-6 sm:pt-7 sm:pb-6">
                <PhotoSlot
                  label="Staff photo coming"
                  src={coach.photo}
                  alt={coach.name}
                  className="aspect-[4/5] w-full rounded-xl ring-1 ring-white/10"
                />
                <div className="min-w-0 pr-8">
                  <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                    {coach.role}
                  </p>
                  <DialogTitle className="font-heading mt-2 text-4xl leading-none tracking-wide text-white uppercase sm:text-5xl">
                    {coach.name}
                  </DialogTitle>
                  <DialogDescription className="mt-3 text-sm text-zinc-400">
                    Coach bio · {slot} of {coaches.length}
                  </DialogDescription>
                </div>
              </div>
            </div>

            <div className="space-y-3 px-5 py-5 sm:px-6">
              <p className="font-heading text-xl tracking-wide text-white uppercase sm:text-2xl">
                Years Coaching - {bioLine(bio?.yearsCoaching)}
              </p>
              <BioStat label="Spouse and kids" value={bioLine(bio?.family)} />
            </div>

            <div className="space-y-5 border-t border-white/8 px-5 py-5 sm:px-6">
              {bio?.familyDetail ? (
                <BioBlock label="Family and more" value={bio.familyDetail} />
              ) : null}
              <BioBlock
                label="Coaching history"
                value={bioLine(bio?.history)}
              />
              <BioBlock
                label="Why they love Yukon"
                value={bioLine(bio?.whyYukon)}
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={() => previous && onSelect(previous)}
                className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/5"
              >
                <ChevronUp className="size-4 shrink-0 text-red-400" />
                <span className="min-w-0">
                  <span className="block text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Previous
                  </span>
                  <span className="font-heading block truncate text-lg tracking-wide text-white uppercase">
                    {previous ? previous.name : "—"}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => next && onSelect(next)}
                className="inline-flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg px-2 py-2 text-right transition-colors hover:bg-white/5"
              >
                <span className="min-w-0">
                  <span className="block text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Next
                  </span>
                  <span className="font-heading block truncate text-lg tracking-wide text-white uppercase">
                    {next ? next.name : "—"}
                  </span>
                </span>
                <ChevronDown className="size-4 shrink-0 text-red-400" />
              </button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
