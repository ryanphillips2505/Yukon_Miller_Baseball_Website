import { BrandLogo } from "@/components/brand-logo";
import { HallDecadeNav } from "@/components/hall-decade-nav";
import {
  allStateByDecade,
  allStateHall,
  honoreeName,
  isAthleticsHallOfFame,
  type AllStateHonoree,
} from "@/lib/all-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Nameplate({ honoree }: { honoree: AllStateHonoree }) {
  const hallOfFame = isAthleticsHallOfFame(honoree);
  const plate = (
    <div
      className={cn(
        "group relative flex min-h-16 items-center justify-between gap-4 overflow-hidden rounded-xl border border-[#d4b56a]/22 bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(232,213,163,0.1)] sm:min-h-[4.25rem] sm:px-5",
        hallOfFame && "border-[#d4b56a]/55",
        honoree.newsSlug &&
          "transition-colors hover:border-[#d4b56a]/60 hover:bg-[#221c14]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-3 left-0 w-0.5 bg-[#d4b56a]/75"
        aria-hidden
      />
      <div className="min-w-0">
        <p className="font-heading text-xl leading-tight tracking-[0.08em] text-[#f7f1e4] uppercase sm:text-2xl">
          {honoreeName(honoree)}
        </p>
        {hallOfFame ? (
          <p className="mt-1 text-[0.58rem] font-semibold tracking-[0.18em] text-[#d4b56a] uppercase">
            Athletics Hall of Fame
          </p>
        ) : null}
      </div>
      <p className="shrink-0 rounded-md border border-[#d4b56a]/40 bg-black/50 px-2.5 py-1.5 font-heading text-lg leading-none tracking-[0.12em] text-[#e8d5a3] tabular-nums sm:text-xl">
        {honoree.year}
      </p>
    </div>
  );

  if (honoree.newsSlug) {
    return (
      <Link
        href={`/news/${honoree.newsSlug}`}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70"
      >
        {plate}
      </Link>
    );
  }

  return plate;
}

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

function Spotlight({
  kicker,
  honoree,
}: {
  kicker: string;
  honoree: (typeof allStateHall)["first"];
}) {
  return (
    <div className="border border-[#d4b56a]/22 bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)] px-5 py-5">
      <p className="text-[0.62rem] font-semibold tracking-[0.24em] text-[#d4b56a] uppercase">
        {kicker}
      </p>
      <p className="font-heading mt-2 text-3xl leading-none tracking-wide text-white uppercase sm:text-4xl">
        {honoreeName(honoree)}
      </p>
      <p className="mt-2 font-heading text-xl tracking-[0.16em] text-[#e8d5a3]">
        {honoree.year}
      </p>
    </div>
  );
}

export function AllStateHall() {
  const decades = allStateByDecade();

  return (
    <section
      id="hall-of-honor"
      className="overflow-hidden rounded-2xl border border-[#d4b56a]/22 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      <header className="relative overflow-hidden border-b border-[#d4b56a]/16 bg-[linear-gradient(180deg,#1c140c_0%,#070708_100%)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.18),transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-6 flex justify-center opacity-[0.08]"
          aria-hidden
        >
          <BrandLogo
            variant="state"
            sizes="(max-width: 768px) 70vw, 520px"
            alt=""
            className="h-auto w-[min(70vw,32rem)]"
          />
        </div>
        <div className="relative px-5 py-10 sm:px-8 sm:py-12">
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
            The baseball wall. Every Miller named All-State, from the first
            class to the latest.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#d4b56a]/16 bg-[#d4b56a]/16 sm:grid-cols-4">
            <Stat
              value={String(allStateHall.count).padStart(2, "0")}
              label="Honorees"
            />
            <Stat value={String(allStateHall.first.year)} label="First class" />
            <Stat value={String(allStateHall.latest.year)} label="Latest" />
            <Stat value={String(allStateHall.years)} label="Years" />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Spotlight kicker="First class" honoree={allStateHall.first} />
            <Spotlight kicker="Latest" honoree={allStateHall.latest} />
          </div>
        </div>
      </header>

      <HallDecadeNav decades={decades.map(([decade]) => decade)} />

      <div>
        {decades.map(([decade, honorees]) => (
          <section
            key={decade}
            id={`decade-${decade}`}
            className="scroll-mt-28 border-b border-white/8 last:border-b-0"
          >
            <div className="flex items-end justify-between bg-[linear-gradient(90deg,rgba(28,20,12,0.95),rgba(7,7,8,0.95))] px-4 py-3 sm:px-6">
              <h3 className="font-heading text-2xl tracking-[0.18em] text-[#d4b56a] uppercase">
                {decade}
              </h3>
              <p className="text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase">
                {String(honorees.length).padStart(2, "0")} named
              </p>
            </div>
            <ul className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-5">
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
