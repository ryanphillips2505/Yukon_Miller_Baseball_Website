import type { TeamId } from "./site";

export type GamePhase = "scrimmage" | "regular" | "postseason";
export type GameLocation = "home" | "away" | "neutral";

export type Game = {
  id: string;
  date: string;
  team: TeamId;
  opponent: string;
  location: GameLocation;
  time?: string;
  phase: GamePhase;
  district?: boolean;
  venue?: string;
  note?: string;
};

/** Add games here as they are released. Do not invent opponents or times. */
export const games: Game[] = [];

export const scheduleNotice =
  "Schedule changes go to players through their team’s coach and parent rep. This board updates when the staff posts a new master schedule.";
