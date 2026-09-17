"use client";

import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { games, scheduleNotice } from "@/lib/schedule";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const filters: { id: "all" | TeamId; label: string }[] = [
  { id: "all", label: "All teams" },
  ...teams.map((team) => ({ id: team.id, label: team.label })),
];

export function ScheduleBoard() {
  const [team, setTeam] = useState<"all" | TeamId>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return games.filter((game) => {
      if (team !== "all" && game.team !== team) return false;
      if (!needle) return true;
      return (
        game.opponent.toLowerCase().includes(needle) ||
        (game.venue ?? "").toLowerCase().includes(needle)
      );
    });
  }, [query, team]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTeam(item.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide uppercase",
                team === item.id
                  ? "border-red-600 bg-red-700 text-white"
                  : "border-white/10 bg-white/4 text-zinc-400 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search opponent or site"
          className="h-10 max-w-xs bg-black/40"
          aria-label="Search schedule"
        />
      </div>

      <p className="text-sm leading-6 text-zinc-400">{scheduleNotice}</p>

      {visible.length === 0 ? (
        <EmptyState
          kicker={games.length === 0 ? "Awaiting release" : "No matches"}
          title={
            games.length === 0
              ? "The next master schedule is not posted yet"
              : "No games match that filter"
          }
          body={
            games.length === 0
              ? "When the staff publishes Varsity, JV Red, and JV White dates, they will land on this board with times, sites, and district marks. Clear a filter or check back after the coaches send the sheet."
              : "Try another team or clear the search. Weather and time changes still go through coaches and parent reps first."
          }
          action={
            games.length === 0
              ? { href: "/contact", label: "Ask about dates" }
              : undefined
          }
        />
      ) : (
        <ol className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/10">
          {visible.map((game) => {
            const teamLabel =
              teams.find((item) => item.id === game.team)?.label ?? game.team;
            return (
              <li
                key={game.id}
                className="grid gap-2 bg-zinc-950 px-4 py-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
              >
                <p className="text-xs tracking-wide text-zinc-500 uppercase">
                  {game.date}
                </p>
                <div>
                  <p className="font-heading text-lg tracking-wide text-white uppercase">
                    {game.location === "away" ? "@" : "vs"} {game.opponent}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {teamLabel}
                    {game.time ? ` · ${game.time}` : ""}
                    {game.venue ? ` · ${game.venue}` : ""}
                  </p>
                </div>
                <p className="text-xs tracking-wide text-zinc-500 uppercase">
                  {game.location}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
