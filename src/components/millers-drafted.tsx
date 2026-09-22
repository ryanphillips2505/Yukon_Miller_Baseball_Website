"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  adjacentDrafted,
  compactPick,
  draftedBoard,
  draftedMillers,
  draftedName,
  draftPickLabel,
  isFirstRound,
  reachedMajors,
  signedLine,
  type DraftedMiller,
  type DraftLine,
} from "@/lib/drafted";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import Image from "next/image";
import { useSyncExternalStore } from "react";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-2 py-2 text-center sm:px-3 sm:py-2.5">
      <p className="font-heading text-2xl leading-none tracking-wide text-[#e8d5a3] sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[0.58rem] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
        {label}
      </p>
    </div>
  );
}

function DraftHistory({ line }: { line: DraftLine }) {
  const signed = line.outcome === "signed";

  return (
    <p
      className={cn(
        "text-sm leading-6",
        signed ? "text-[#f4f1ea]" : "text-zinc-500",
      )}
    >
      <span className="tabular-nums">{line.year} MLB Draft</span>
      {" — "}
      {draftPickLabel(line)}
      {", "}
      {line.club}
      {" — "}
      <span
        className={cn(
          "font-semibold tracking-[0.08em] uppercase",
          signed ? "text-[#e8d5a3]" : "text-zinc-600",
        )}
      >
        {signed ? "Signed" : "Did Not Sign"}
      </span>
    </p>
  );
}

function ClubMark({
  player,
  size,
}: {
  player: DraftedMiller;
  size: "tile" | "detail";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-[#f4f1ea] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
        size === "tile" && "size-14 shrink-0 p-1.5 sm:size-16",
        size === "detail" && "size-28 p-3 sm:size-32",
      )}
    >
      <Image
        src={player.signedLogo.src}
        alt={player.signedLogo.alt}
        width={player.signedLogo.width}
        height={player.signedLogo.height}
        sizes={size === "tile" ? "64px" : "128px"}
        loading="eager"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function DraftTile({
  player,
  selected,
  onOpen,
}: {
  player: DraftedMiller;
  selected: boolean;
  onOpen: (player: DraftedMiller) => void;
}) {
  const signed = signedLine(player);
  const firstRound = isFirstRound(player);
  const majors = reachedMajors(player);
  const extraDrafts = player.lines.length - 1;

  return (
    <button
      type="button"
      id={`drafted-${player.id}`}
      onClick={() => onOpen(player)}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors sm:gap-4 sm:px-4",
        "lg:flex-col lg:items-start lg:px-4 lg:py-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70",
        firstRound ? "border-[#d4b56a]/55" : "border-[#d4b56a]/18",
        selected
          ? "bg-[#221c14]"
          : "bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)] hover:border-[#d4b56a]/50 hover:bg-[#1c1812]",
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-1"
        style={{
          background: `linear-gradient(180deg, ${player.colors.secondary}, ${player.colors.primary})`,
        }}
        aria-hidden
      />
      <ClubMark player={player} size="tile" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {firstRound ? (
            <span className="rounded-full border border-[#d4b56a]/55 bg-[#d4b56a]/12 px-2 py-0.5 text-[0.52rem] font-semibold tracking-[0.16em] text-[#e8d5a3] uppercase">
              1st
            </span>
          ) : null}
          {majors ? (
            <span className="rounded-full border border-white/16 bg-white/6 px-2 py-0.5 text-[0.52rem] font-semibold tracking-[0.16em] text-zinc-300 uppercase">
              MLB
            </span>
          ) : null}
          {extraDrafts > 0 ? (
            <span className="text-[0.52rem] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
              {player.lines.length} drafts
            </span>
          ) : null}
        </div>
        <h3 className="font-heading mt-1 text-xl leading-none tracking-wide text-white uppercase sm:text-2xl">
          {draftedName(player)}
        </h3>
        <p className="mt-1.5 text-xs tabular-nums text-[#f4f1ea] sm:text-sm">
          {compactPick(signed)}
        </p>
        <p className="mt-1 text-[0.62rem] font-semibold tracking-[0.14em] text-[#e8d5a3] uppercase">
          {player.signedClub}
        </p>
      </div>
    </button>
  );
}

function DraftInspector({
  player,
  onClose,
  onSelect,
}: {
  player: DraftedMiller | null;
  onClose: () => void;
  onSelect: (player: DraftedMiller) => void;
}) {
  const previous = player ? adjacentDrafted(player.id, -1) : undefined;
  const next = player ? adjacentDrafted(player.id, 1) : undefined;
  const signed = player ? signedLine(player) : null;
  const firstRound = player ? isFirstRound(player) : false;
  const majors = player ? reachedMajors(player) : false;
  const slot = player
    ? draftedMillers.findIndex((entry) => entry.id === player.id) + 1
    : 0;

  return (
    <Dialog open={player !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/80 supports-backdrop-filter:backdrop-blur-sm"
        className="max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-1.5rem)] overflow-y-auto border border-[#d4b56a]/28 bg-[#0a0a0c] p-0 text-white ring-0 sm:max-w-xl"
        onKeyDown={(event) => {
          if (!player) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            if (previous) onSelect(previous);
          }
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            if (next) onSelect(next);
          }
        }}
      >
        {player && signed ? (
          <>
            <div className="relative overflow-hidden border-b border-[#d4b56a]/18 bg-[linear-gradient(180deg,#22180e_0%,#0a0a0c_100%)]">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(212,181,106,0.16),transparent_48%)]"
                aria-hidden
              />
              <DialogClose
                className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white transition-colors hover:border-white/35 hover:bg-black/80"
                aria-label="Close draft plaque"
              >
                <XIcon className="size-4" />
              </DialogClose>
              <div className="relative flex items-center gap-5 px-5 py-6 pr-14 sm:px-6">
                <ClubMark player={player} size="detail" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {firstRound ? (
                      <p className="rounded-full border border-[#d4b56a]/55 bg-[#d4b56a]/12 px-2.5 py-0.5 text-[0.58rem] font-semibold tracking-[0.18em] text-[#e8d5a3] uppercase">
                        1st Round
                      </p>
                    ) : null}
                    {majors ? (
                      <p className="rounded-full border border-white/16 bg-white/6 px-2.5 py-0.5 text-[0.58rem] font-semibold tracking-[0.18em] text-zinc-300 uppercase">
                        Major Leaguer
                      </p>
                    ) : null}
                  </div>
                  <DialogTitle className="font-heading mt-2 text-3xl leading-none tracking-wide text-white uppercase sm:text-4xl">
                    {draftedName(player)}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm text-zinc-400">
                    {player.signedClub} · {slot} of {draftedBoard.count}
                  </DialogDescription>
                </div>
              </div>
            </div>

            <div className="space-y-3 px-5 py-5 sm:px-6">
              {player.lines.map((line) => (
                <DraftHistory
                  key={`${player.id}-${line.year}-${line.club}`}
                  line={line}
                />
              ))}
              {player.note ? (
                <p className="text-sm leading-6 text-zinc-400">{player.note}</p>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={() => previous && onSelect(previous)}
                disabled={!previous}
                className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/5 disabled:opacity-40"
              >
                <ChevronLeft className="size-4 shrink-0 text-[#d4b56a]" />
                <span className="min-w-0">
                  <span className="block text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Previous
                  </span>
                  <span className="font-heading block truncate text-lg tracking-wide text-white uppercase">
                    {previous ? draftedName(previous) : "—"}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => next && onSelect(next)}
                disabled={!next}
                className="inline-flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg px-2 py-2 text-right transition-colors hover:bg-white/5 disabled:opacity-40"
              >
                <span className="min-w-0">
                  <span className="block text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Next
                  </span>
                  <span className="font-heading block truncate text-lg tracking-wide text-white uppercase">
                    {next ? draftedName(next) : "—"}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-[#d4b56a]" />
              </button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function subscribeDraftHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function draftedFromHash() {
  const raw = window.location.hash.replace(/^#/, "");
  const id = raw.startsWith("drafted-") ? raw.slice("drafted-".length) : "";
  return draftedMillers.find((player) => player.id === id) ?? null;
}

function setDraftHash(id?: string) {
  const next = id ? `#drafted-${id}` : "#drafted";
  window.history.replaceState(null, "", next);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function MillersDrafted() {
  const selected = useSyncExternalStore(
    subscribeDraftHash,
    draftedFromHash,
    () => null,
  );

  function openPlayer(player: DraftedMiller) {
    setDraftHash(player.id);
  }

  function closePlayer() {
    setDraftHash();
  }

  return (
    <section
      id="drafted"
      className="overflow-hidden rounded-2xl border border-[#d4b56a]/28 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      <header className="relative overflow-hidden border-b border-[#d4b56a]/18 bg-[linear-gradient(180deg,#22180e_0%,#070708_100%)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,16,46,0.12),transparent_42%),radial-gradient(circle_at_50%_20%,rgba(212,181,106,0.16),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3] to-transparent"
          aria-hidden
        />
        <div className="relative px-4 py-6 sm:px-6 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.36em] text-[#d4b56a] uppercase">
                Yukon High School
              </p>
              <h2 className="font-heading mt-2 text-4xl leading-[0.88] tracking-wide text-white uppercase sm:text-5xl">
                Drafted &amp; Signed
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                All nine signed picks on one board. Open a Miller for the full
                draft path.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-[#d4b56a]/16 bg-[#d4b56a]/16">
              <Stat
                value={String(draftedBoard.count).padStart(2, "0")}
                label="Signed"
              />
              <Stat
                value={String(draftedBoard.firstRound).padStart(2, "0")}
                label="1st rd"
              />
              <Stat
                value={String(draftedBoard.majors).padStart(2, "0")}
                label="MLB"
              />
              <Stat value={draftedBoard.span} label="Years" />
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-3 lg:p-5">
        {draftedMillers.map((player) => (
          <DraftTile
            key={player.id}
            player={player}
            selected={selected?.id === player.id}
            onOpen={openPlayer}
          />
        ))}
      </div>

      <DraftInspector
        player={selected}
        onClose={closePlayer}
        onSelect={openPlayer}
      />
    </section>
  );
}
