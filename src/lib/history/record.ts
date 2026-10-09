import type {
  HistoricalGame,
  HistoricalLocation,
  HistoricalRecord,
  HistoricalResult,
} from "@/lib/history/types";

export function orderedGames(games: HistoricalGame[]) {
  return [...games].sort((a, b) => a.number - b.number);
}

export function historyWeekday(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
}

export function formatHistoryWeekday(iso: string) {
  return historyWeekday(iso).slice(0, 3).toUpperCase();
}

export function formatHistoryDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function historyVersus(location: HistoricalLocation) {
  return location === "away" ? "@" : "vs";
}

export function historyResult(game: HistoricalGame): HistoricalResult {
  if (game.yukonScore > game.opponentScore) return "W";
  if (game.yukonScore < game.opponentScore) return "L";
  return "T";
}

export function formatHistoryScore(game: HistoricalGame) {
  return `${game.yukonScore}–${game.opponentScore}`;
}

export function runningRecords(games: HistoricalGame[]) {
  let wins = 0;
  let losses = 0;
  let ties = 0;
  return orderedGames(games).map((game) => {
    const result = historyResult(game);
    if (result === "W") wins += 1;
    else if (result === "L") losses += 1;
    else ties += 1;
    return { game, result, wins, losses, ties };
  });
}

export function seasonRecord(games: HistoricalGame[]): HistoricalRecord {
  const last = runningRecords(games).at(-1);
  const wins = last?.wins ?? 0;
  const losses = last?.losses ?? 0;
  const ties = last?.ties ?? 0;
  return {
    wins,
    losses,
    ties,
    games: games.length,
    display: ties > 0 ? `${wins}–${losses}–${ties}` : `${wins}–${losses}`,
  };
}
