export type HistoricalLocation = "home" | "away" | "neutral" | "unknown";

export type HistoricalGame = {
  number: number;
  date: string;
  opponent: string;
  location: HistoricalLocation;
  yukonScore: number;
  opponentScore: number;
  district?: boolean;
  tournament?: string;
  phase?: "postseason";
};

export type HistoricalSeason = {
  year: number;
  teamLabel: string;
  games: HistoricalGame[];
};

export type HistoricalResult = "W" | "L" | "T";

export type HistoricalRecord = {
  wins: number;
  losses: number;
  ties: number;
  games: number;
  display: string;
};
