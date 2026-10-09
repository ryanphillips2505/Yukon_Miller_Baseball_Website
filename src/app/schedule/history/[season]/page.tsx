import { SeasonResults } from "@/components/season-history";
import { historicalSeasons, getHistoricalSeason } from "@/lib/history/seasons";
import { seasonRecord } from "@/lib/history/record";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return historicalSeasons.map((season) => ({ season: String(season.year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ season: string }>;
}): Promise<Metadata> {
  const { season: seasonParam } = await params;
  const season = getHistoricalSeason(seasonParam);
  if (!season) return { title: "Season history" };

  const record = seasonRecord(season.games);
  const title = `${season.year} ${season.teamLabel}`;
  const description = `${season.year} Yukon Millers ${season.teamLabel.toLowerCase()} results, ${record.display} in ${record.games} games.`;
  const path = `/schedule/history/${season.year}`;

  return {
    title,
    description,
    ...publicPageSeo(path),
    openGraph: {
      ...publicPageSeo(path).openGraph,
      title,
      description,
    },
  };
}

export default async function HistoricalSeasonPage({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  const { season: seasonParam } = await params;
  const season = getHistoricalSeason(seasonParam);
  if (!season) notFound();
  return <SeasonResults season={season} />;
}
