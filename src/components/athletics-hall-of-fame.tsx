import { HonorPanel } from "@/components/honor-panel";
import {
  athleticsHallOfFame,
  hallMemberName,
  hallOfFame,
  type HallOfFameMember,
} from "@/lib/hall-of-fame";

function InductionPlaque({ member }: { member: HallOfFameMember }) {
  return (
    <article className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-xl border border-[#d4b56a]/70 bg-[linear-gradient(180deg,#3a2c18_0%,#14110c_42%,#070708_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(232,213,163,0.22)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8a0f22] via-[#c8102e] to-[#8a0f22]"
        aria-hidden
      />
      <div className="relative">
        <p className="text-[0.55rem] font-semibold tracking-[0.28em] text-[#e8d5a3] uppercase">
          Inducted {member.classYear}
        </p>
        <h3 className="font-heading mt-2 text-3xl leading-none tracking-wide text-white uppercase">
          {hallMemberName(member)}
        </h3>
        <p className="mt-2 text-[0.62rem] font-semibold tracking-[0.16em] text-[#e8d5a3] uppercase">
          {member.sport}
          {member.allStateYear ? ` · All-State ${member.allStateYear}` : null}
        </p>
      </div>
    </article>
  );
}

export function AthleticsHallOfFame() {
  return (
    <HonorPanel
      id="hall-of-fame"
      kicker="Yukon Athletics"
      title="Hall of Fame"
      meta={`${String(hallOfFame.count).padStart(2, "0")} inductees · ${hallOfFame.firstClass}–${hallOfFame.latestClass}`}
      featured
    >
      <div className="flex h-full flex-col gap-2 p-3">
        {athleticsHallOfFame.map((member) => (
          <InductionPlaque key={member.id} member={member} />
        ))}
      </div>
    </HonorPanel>
  );
}
