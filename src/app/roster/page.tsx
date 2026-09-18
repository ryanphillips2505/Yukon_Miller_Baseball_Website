import { RosterBoard } from "@/components/roster-board";
import { PageHero } from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roster" };

export default function RosterPage() {
  return (
    <div>
      <PageHero
        kicker="Players"
        title="Roster"
        lede="The program roster, listed A–Z. Select a player for name, class, position, bats, throws, and photo."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <RosterBoard />
      </div>
    </div>
  );
}
