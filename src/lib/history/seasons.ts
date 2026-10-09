import { varsity2025 } from "@/lib/history/2025";
import { varsity2026 } from "@/lib/history/2026";
import type { HistoricalSeason } from "@/lib/history/types";

export const historicalSeasons: HistoricalSeason[] = [varsity2026, varsity2025].sort(
  (a, b) => b.year - a.year,
);

export function getHistoricalSeason(season: string) {
  if (!/^\d{4}$/.test(season)) return undefined;
  const year = Number(season);
  return historicalSeasons.find((entry) => entry.year === year);
}
