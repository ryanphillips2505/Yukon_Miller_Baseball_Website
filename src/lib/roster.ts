import type { TeamId } from "./site";

export type Player = {
  id: string;
  name: string;
  number?: string;
  classYear?: "Fr" | "So" | "Jr" | "Sr";
  positions?: string[];
  team: TeamId;
  photo?: string;
  batsThrows?: string;
};

/** Add players after tryouts. Leave photos off until Ryan supplies them. */
export const players: Player[] = [];
