import { ScheduleBoard } from "@/components/schedule-board";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule", ...publicPageSeo("/schedule") };

export default function SchedulePage() {
  return (
    <div className="bg-black">
      <ScheduleBoard />
    </div>
  );
}
