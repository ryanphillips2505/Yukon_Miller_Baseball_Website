import {
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
import Image from "next/image";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-[#d4b56a]/18 bg-black/50 px-3 py-4 text-center sm:px-4">
      <p className="font-heading text-3xl leading-none tracking-wide text-[#e8d5a3] sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-[0.62rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
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

function DraftPlaque({ player }: { player: DraftedMiller }) {
  const signed = signedLine(player);
  const firstRound = isFirstRound(player);
  const majors = reachedMajors(player);
  const multiDraft = player.lines.length > 1;

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)] shadow-[inset_0_1px_0_rgba(232,213,163,0.1)] sm:flex-row sm:items-stretch",
        firstRound ? "border-[#d4b56a]/70" : "border-[#d4b56a]/22",
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background: `linear-gradient(180deg, ${player.colors.secondary}, ${player.colors.primary})`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(212,181,106,0.08),transparent_42%)]"
        aria-hidden
      />

      <div className="relative flex items-center justify-center px-6 pt-7 pb-2 sm:w-52 sm:shrink-0 sm:px-6 sm:py-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-[#f4f1ea] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.28)]">
          <Image
            src={player.signedLogo.src}
            alt={player.signedLogo.alt}
            width={player.signedLogo.width}
            height={player.signedLogo.height}
            sizes="112px"
            loading="eager"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 pt-3 pb-7 sm:py-8 sm:pr-8 sm:pl-0">
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
          <p className="text-[0.58rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            Signed {signed.year}
          </p>
        </div>

        <h3 className="font-heading mt-3 text-3xl leading-none tracking-wide text-white uppercase sm:text-4xl">
          {draftedName(player)}
        </h3>

        {multiDraft ? (
          <div className="mt-4 space-y-1">
            {player.lines.map((line) => (
              <DraftHistory
                key={`${player.id}-${line.year}-${line.club}`}
                line={line}
              />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#f4f1ea]">
            {signed.year} MLB Draft — {draftPickLabel(signed)}
          </p>
        )}

        <p className="mt-3 text-[0.72rem] font-semibold tracking-[0.18em] text-[#e8d5a3] uppercase">
          {player.signedClub}
        </p>
        {player.note ? (
          <p className="mt-2 text-sm leading-6 text-zinc-400">{player.note}</p>
        ) : null}
      </div>
    </article>
  );
}

export function MillersDrafted() {
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
        <div className="relative px-5 py-10 sm:px-8 sm:py-12">
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Yukon High School
          </p>
          <h2 className="font-heading mt-3 text-center text-4xl leading-[0.86] tracking-wide text-white uppercase sm:text-5xl lg:text-6xl">
            Drafted &amp; Signed
          </h2>
          <p className="font-heading mt-3 text-center text-lg tracking-[0.2em] text-[#e8d5a3] uppercase sm:text-xl">
            MLB Draft Picks
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-zinc-400">
            Yukon High School MLB draft picks who signed. Each plaque carries
            the club they signed with.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#d4b56a]/16 bg-[#d4b56a]/16 sm:grid-cols-4">
            <Stat
              value={String(draftedBoard.count).padStart(2, "0")}
              label="Signed"
            />
            <Stat
              value={String(draftedBoard.firstRound).padStart(2, "0")}
              label="First-round"
            />
            <Stat
              value={String(draftedBoard.majors).padStart(2, "0")}
              label="Reached MLB"
            />
            <Stat value={draftedBoard.span} label="Years" />
          </div>
        </div>
      </header>

      <div className="grid gap-3 p-3 sm:gap-4 sm:p-5 lg:p-8">
        {draftedMillers.map((player) => (
          <DraftPlaque key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}
