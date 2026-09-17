import { PageHero } from "@/components/page-hero";
import { ScheduleBoard } from "@/components/schedule-board";
import { teams } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div>
      <PageHero
        kicker="2027 season"
        title="Schedule"
        lede="One board for Varsity, JV Red, and JV White. Games appear here when the staff releases the master schedule — not before."
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
              <p className="text-sm text-zinc-400">Home site: {team.field}</p>
            </div>
          ))}
        </div>
        <ScheduleBoard />
      </div>
    </div>
  );
}
