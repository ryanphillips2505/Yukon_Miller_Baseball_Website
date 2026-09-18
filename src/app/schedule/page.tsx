import { PageHero } from "@/components/page-hero";
import { ScheduleBoard } from "@/components/schedule-board";
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
        <ScheduleBoard />
      </div>
    </div>
  );
}
