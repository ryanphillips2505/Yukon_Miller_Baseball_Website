import { BrandLogo } from "@/components/brand-logo";
import {
  athleticsHallOfFame,
  hallMemberName,
  hallOfFame,
  type HallOfFameMember,
} from "@/lib/hall-of-fame";

function InductionPlaque({ member }: { member: HallOfFameMember }) {
  return (
    <article className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#d4b56a]/40 bg-[linear-gradient(180deg,#2a2216_0%,#0c0b09_42%,#070708_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(232,213,163,0.18)] sm:min-h-[24rem]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-[#d4b56a]/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-[#d4b56a]/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
        aria-hidden
      >
        <BrandLogo
          variant="mark"
          sizes="220px"
          alt=""
          className="w-40 sm:w-48"
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 py-8 text-center sm:px-8 sm:py-10">
        <p className="text-[0.62rem] font-semibold tracking-[0.32em] text-[#d4b56a] uppercase">
          Inducted
        </p>
        <p className="font-heading mt-3 text-6xl leading-none tracking-wide text-[#e8d5a3] sm:text-7xl">
          {member.classYear}
        </p>
        <div className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
        <h3 className="font-heading mt-6 text-4xl leading-[0.9] tracking-wide text-white uppercase sm:text-5xl">
          {hallMemberName(member)}
        </h3>
        <p className="mt-4 text-[0.68rem] font-semibold tracking-[0.22em] text-[#d4b56a] uppercase">
          Class of {member.classYear}
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {member.sport}
          {member.allStateYear
            ? ` · Miller All-State ${member.allStateYear}`
            : null}
        </p>
      </div>
    </article>
  );
}

export function AthleticsHallOfFame() {
  return (
    <section
      id="hall-of-fame"
      className="overflow-hidden rounded-2xl border border-[#d4b56a]/35 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      <header className="relative overflow-hidden border-b border-[#d4b56a]/22 bg-[linear-gradient(180deg,#2a1c0e_0%,#070708_100%)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,16,46,0.16),transparent_42%),radial-gradient(circle_at_50%_20%,rgba(212,181,106,0.2),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3] to-transparent"
          aria-hidden
        />
        <div className="relative px-5 py-10 sm:px-8 sm:py-12">
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            {hallOfFame.kicker}
          </p>
          <h2 className="font-heading mt-3 text-center text-4xl leading-[0.88] tracking-wide text-white uppercase sm:text-5xl lg:text-6xl">
            Yukon Athletics
            <span className="mt-2 block text-[#e8d5a3]">Hall of Fame</span>
          </h2>
          <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-zinc-400 sm:text-[0.95rem]">
            The highest honor a Yukon athlete can receive. These Millers were
            inducted into the Yukon Athletics Hall of Fame — above All-State,
            reserved for a lifetime in the red and white.
          </p>
          <p className="mt-4 text-center font-heading text-sm tracking-[0.2em] text-[#e8d5a3] uppercase">
            {hallOfFame.count} inductees · {hallOfFame.firstClass}–
            {hallOfFame.latestClass}
          </p>
        </div>
      </header>

      <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2 lg:p-8">
        {athleticsHallOfFame.map((member) => (
          <InductionPlaque key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
