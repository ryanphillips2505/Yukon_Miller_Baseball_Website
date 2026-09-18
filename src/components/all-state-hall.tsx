import {
  allStateByDecade,
  allStateHall,
  honoreeName,
  type AllStateHonoree,
} from "@/lib/all-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Nameplate({ honoree }: { honoree: AllStateHonoree }) {
  const plate = (
    <div
      className={cn(
        "group relative flex min-h-[3.35rem] items-center justify-between gap-4 overflow-hidden border border-[#d4b56a]/22 bg-[linear-gradient(180deg,#1a1712_0%,#0d0c0a_100%)] px-4 py-3 sm:min-h-[3.6rem] sm:px-5",
        honoree.newsSlug && "transition-colors hover:border-[#d4b56a]/55 hover:bg-[#1f1a14]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3]/55 to-transparent"
        aria-hidden
      />
      <p className="min-w-0 font-heading text-[1.15rem] leading-none tracking-[0.08em] text-[#f7f1e4] uppercase sm:text-xl">
        {honoreeName(honoree)}
      </p>
      <p className="shrink-0 font-heading text-lg leading-none tracking-[0.14em] text-[#d4b56a] tabular-nums sm:text-xl">
        {honoree.year}
      </p>
    </div>
  );

  if (honoree.newsSlug) {
    return (
      <Link
        href={`/news/${honoree.newsSlug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70"
      >
        {plate}
      </Link>
    );
  }

  return plate;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-[#d4b56a]/18 bg-black/40 px-4 py-4 text-center">
      <p className="font-heading text-3xl leading-none tracking-wide text-[#e8d5a3] sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
        {label}
      </p>
    </div>
  );
}

export function AllStateHall() {
  const decades = allStateByDecade();

  return (
    <section className="overflow-hidden rounded-2xl border border-[#d4b56a]/20 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <header className="relative overflow-hidden border-b border-[#d4b56a]/16 bg-[linear-gradient(180deg,#1c140c_0%,#070708_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.16),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
        <div className="relative px-5 py-8 sm:px-8 sm:py-10">
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Hall of Honor
          </p>
          <h2 className="font-heading mt-3 text-center text-5xl leading-[0.86] tracking-wide text-white uppercase sm:text-6xl lg:text-7xl">
            All-State
          </h2>
          <p className="font-heading mt-3 text-center text-lg tracking-[0.28em] text-[#e8d5a3] uppercase sm:text-xl">
            Yukon Millers
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-6 text-zinc-400">
            The official wall. Every Miller named All-State, from the first
            class to the latest.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-[#d4b56a]/16 bg-[#d4b56a]/16 sm:grid-cols-4">
            <Stat
              value={String(allStateHall.count).padStart(2, "0")}
              label="Honorees"
            />
            <Stat value={String(allStateHall.first.year)} label="First class" />
            <Stat value={String(allStateHall.latest.year)} label="Latest" />
            <Stat value={String(allStateHall.years)} label="Years" />
          </div>
        </div>
      </header>

      <div>
        {decades.map(([decade, honorees]) => (
          <section key={decade} className="border-b border-white/8 last:border-b-0">
            <div className="flex items-end justify-between bg-[linear-gradient(90deg,rgba(28,20,12,0.95),rgba(7,7,8,0.95))] px-5 py-3 sm:px-8">
              <p className="font-heading text-2xl tracking-[0.18em] text-[#d4b56a] uppercase">
                {decade}
              </p>
              <p className="text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase">
                {String(honorees.length).padStart(2, "0")} named
              </p>
            </div>
            <ul className="grid gap-px bg-[#d4b56a]/12 sm:grid-cols-2">
              {honorees.map((honoree) => (
                <li key={honoree.id}>
                  <Nameplate honoree={honoree} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
