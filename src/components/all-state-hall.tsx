"use client";

import { HallDecadeNav } from "@/components/hall-decade-nav";
import { HonorPanel } from "@/components/honor-panel";
import {
  allStateByDecade,
  allStateHall,
  honoreeName,
  isAthleticsHallOfFame,
  type AllStateHonoree,
} from "@/lib/all-state";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

function Nameplate({ honoree }: { honoree: AllStateHonoree }) {
  const hallOfFame = isAthleticsHallOfFame(honoree);
  const plate = (
    <div
      className={cn(
        "relative flex items-center justify-between gap-3 overflow-hidden rounded-lg border px-3 py-2",
        hallOfFame
          ? "border-[#d4b56a]/55 bg-[#1c1812]"
          : "border-[#d4b56a]/16 bg-[linear-gradient(180deg,#1c1812_0%,#0c0b09_100%)]",
        honoree.newsSlug &&
          "transition-colors hover:border-[#d4b56a]/55 hover:bg-[#221c14]",
      )}
    >
      <div className="min-w-0">
        <p className="font-heading text-lg leading-none tracking-[0.08em] text-[#f7f1e4] uppercase">
          {honoreeName(honoree)}
        </p>
        {hallOfFame ? (
          <p className="mt-1 text-[0.52rem] font-semibold tracking-[0.16em] text-[#d4b56a] uppercase">
            Hall of Fame
          </p>
        ) : null}
      </div>
      <p className="shrink-0 font-heading text-base tracking-[0.1em] text-[#e8d5a3] tabular-nums">
        {honoree.year}
      </p>
    </div>
  );

  if (honoree.newsSlug) {
    return (
      <Link
        href={`/news/${honoree.newsSlug}`}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70"
      >
        {plate}
      </Link>
    );
  }

  return plate;
}

export function AllStateHall() {
  const decades = allStateByDecade();
  const [active, setActive] = useState("All");
  const visible = useMemo(() => {
    if (active === "All") return decades;
    return decades.filter(([decade]) => decade === active);
  }, [active, decades]);

  return (
    <HonorPanel
      id="hall-of-honor"
      kicker="Yukon Millers"
      title="All-State"
      meta={`${String(allStateHall.count).padStart(2, "0")} named · ${allStateHall.span}`}
      toolbar={
        <HallDecadeNav
          decades={decades.map(([decade]) => decade)}
          active={active}
          onChange={setActive}
        />
      }
    >
      <div>
        {visible.map(([decade, honorees]) => (
          <section key={decade} id={`decade-${decade}`}>
            <div className="flex items-end justify-between px-3 pt-3 pb-1.5">
              <h3 className="font-heading text-sm tracking-[0.18em] text-[#d4b56a] uppercase">
                {decade}
              </h3>
              <p className="text-[0.55rem] tracking-[0.16em] text-zinc-500 uppercase">
                {String(honorees.length).padStart(2, "0")}
              </p>
            </div>
            <ul className="space-y-1.5 px-3 pb-3">
              {honorees.map((honoree) => (
                <li key={honoree.id}>
                  <Nameplate honoree={honoree} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </HonorPanel>
  );
}
