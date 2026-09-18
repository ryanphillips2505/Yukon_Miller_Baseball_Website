import { ScheduleBoard } from "@/components/schedule-board";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div className="bg-black">
      <ScheduleBoard />
    </div>
  );
}
