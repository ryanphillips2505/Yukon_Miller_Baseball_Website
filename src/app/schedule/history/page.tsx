import { SeasonHistoryIndex } from "@/components/season-history";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Season history",
  description: "Completed Yukon Millers seasons.",
  ...publicPageSeo("/schedule/history"),
};

export default function SeasonHistoryPage() {
  return <SeasonHistoryIndex />;
}
