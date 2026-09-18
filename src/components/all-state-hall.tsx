import { BrandLogo } from "@/components/brand-logo";
import {
  allStateByDecade,
  allStateHall,
  honoreeName,
  type AllStateHonoree,
} from "@/lib/all-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Nameplate({
  honoree,
  wide = false,
}: {
  honoree: AllStateHonoree;
  wide?: boolean;
}) {
  const plate = (
    <div
      className={cn(
        "group relative flex min-h-[3.6rem] items-center justify-between gap-5 overflow-hidden border border-[#d4b56a]/20 bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)] px-4 py-3 shadow-[inset_0_1px_0_rgba(232,213,163,0.12)] sm:min-h-[3.85rem] sm:px-5",
        honoree.newsSlug &&
          "transition-colors hover:border-[#d4b56a]/55 hover:bg-[#221c14]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[#d4b56a]/70"
        aria-hidden
      />
      <p
        className={cn(
          "min-w-0 font-heading leading-none tracking-[0.08em] text-[#f7f1e4] uppercase",
          wide ? "text-xl sm:text-2xl" : "text-[1.15rem] sm:text-xl",
        )}
      >
        {honoreeName(honoree)}
      </p>
      <p className="shrink-0 border border-[#d4b56a]/35 bg-black/40 px-2.5 py-1 font-heading text-lg leading-none tracking-[0.14em] text-[#e8d5a3] tabular-nums sm:text-xl">
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
    <div className="border border-[#d4b56a]/18 bg-black/50 px-4 py-4 text-center">
      <p className="font-heading text-3xl leading-none tracking-wide text-[#e8d5a3] sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
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
    <section className="overflow-hidden rounded-2xl border border-[#d4b56a]/22 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <header className="relative overflow-hidden border-b border-[#d4b56a]/16 bg-[linear-gradient(180deg,#1c140c_0%,#070708_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.18),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center opacity-[0.08]">
          <BrandLogo
            variant="state"
            sizes="(max-width: 768px) 70vw, 520px"
            className="h-auto w-[min(70vw,32rem)]"
          />
        </div>
        <div className="relative px-5 py-10 sm:px-8 sm:py-12">
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Hall of Honor
          </p>
          <h1 className="font-heading mt-3 text-center text-5xl leading-[0.86] tracking-wide text-white uppercase sm:text-6xl lg:text-7xl">
            All-State
          </h1>
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
          <div className="mt-px grid gap-px overflow-hidden border border-t-0 border-[#d4b56a]/16 bg-[#d4b56a]/16 sm:grid-cols-2">
            <Spotlight kicker="First class" honoree={allStateHall.first} />
            <Spotlight kicker="Latest" honoree={allStateHall.latest} />
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
            <ul className="grid sm:grid-cols-2">
              {honorees.map((honoree, index) => {
                const wide =
                  honorees.length % 2 === 1 && index === honorees.length - 1;
                return (
                  <li key={honoree.id} className={wide ? "sm:col-span-2" : undefined}>
                    <Nameplate honoree={honoree} wide={wide} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
