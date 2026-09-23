import { CommitBoard } from "@/components/commit-board";
import { PageHero } from "@/components/page-hero";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Recruiting", ...publicPageSeo("/recruiting") };

export default function RecruitingPage() {
  return (
    <div>
      <PageHero
        kicker="Next level"
        title="Recruiting"
        lede="College commits post here when a Miller makes it official. College coaches can reach the Yukon staff directly."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <CommitBoard />
      </div>
    </div>
  );
}
