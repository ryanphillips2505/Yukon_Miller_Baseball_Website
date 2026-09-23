import { SponsorBoard } from "@/components/sponsor-board";
import { PageHero } from "@/components/page-hero";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "2026–27 Yukon Millers sponsorship packet and the partners on the Miller Field board.",
  ...publicPageSeo("/sponsors"),
  openGraph: {
    ...publicPageSeo("/sponsors").openGraph,
    title: "2026–27 Yukon Millers Sponsorship Packet",
    description:
      "Sponsorship packages from Single through Foul Ball, plus the form for artwork and payment.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SponsorsPage() {
  return (
    <div>
      <PageHero
        kicker="Home Run Club"
        title="Sponsors"
        lede="These partners keep the program on the field."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SponsorBoard />
      </div>
    </div>
  );
}
