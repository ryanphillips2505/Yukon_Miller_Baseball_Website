import { RosterBoard } from "@/components/roster-board";
import { PageHero } from "@/components/page-hero";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roster", ...publicPageSeo("/roster") };

export default function RosterPage() {
  return (
    <div>
      <PageHero
        kicker="Players"
        title="Roster"
        lede="Browse the Yukon Miller Baseball roster by class or position. Select a player to view their profile."
        className="pb-5 sm:pb-6"
      />
      <div className="mx-auto max-w-6xl px-4 pt-3 pb-10 sm:px-6 sm:pt-4">
        <RosterBoard />
      </div>
    </div>
  );
}
