import { PageHero } from "@/components/page-hero";
import { ScheduleBoard } from "@/components/schedule-board";
import { gameCount, games } from "@/lib/schedule";
import { teams } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div>
      <PageHero
        kicker="2027 season"
        title="Schedule"
        lede="Master, Varsity, JV Red, and JV White from the program sheet. Home games are at Miller Field."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4"
            >
              <p className="font-heading text-lg tracking-wide text-white uppercase">
                {team.label}
              </p>
              <p className="text-sm text-zinc-400">
                {gameCount(games.filter((game) => game.team === team.id))} games
              </p>
            </div>
          ))}
        </div>
        <ScheduleBoard />
      </div>
    </div>
  );
}
