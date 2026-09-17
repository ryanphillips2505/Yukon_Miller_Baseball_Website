"use client";

import {
  formatGameDate,
  gamesForView,
  masterDays,
  phaseLabel,
  scheduleNotes,
  scheduleNotice,
  versusLabel,
  type Game,
  type ScheduleView,
} from "@/lib/schedule";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const views: { id: ScheduleView; label: string }[] = [
  { id: "master", label: "Master" },
  ...teams.map((team) => ({ id: team.id, label: team.label })),
];

function teamLabel(id: TeamId) {
  return teams.find((team) => team.id === id)?.label ?? id;
}

function gameLine(game: Game) {
  return [
    `${versusLabel(game.location)} ${game.opponent}`,
    game.time,
    game.venue,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function ScheduleBoard() {
  const [view, setView] = useState<ScheduleView>("master");
  const visible = useMemo(() => gamesForView(view), [view]);
  const days = useMemo(() => masterDays(visible), [visible]);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <header className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#1a0a0d_0%,#0a0a0c_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,16,46,0.28),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
        <div className="relative flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
              2027 season
            </p>
            <h2 className="font-heading mt-2 text-4xl leading-none tracking-wide text-white uppercase sm:text-5xl">
              {view === "master" ? "Master schedule" : `${teamLabel(view)} schedule`}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              {scheduleNotice}
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl leading-none text-white">
              {String(visible.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
              Games
            </p>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-2 px-5 pb-5 sm:px-7">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide uppercase",
                view === item.id
                  ? "border-red-600 bg-red-700 text-white"
                  : "border-white/10 bg-white/4 text-zinc-400 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {view === "master" ? <MasterTable days={days} /> : <TeamList days={days} />}

      <footer className="space-y-1 border-t border-white/10 px-5 py-5 sm:px-7">
        {scheduleNotes.map((note) => (
          <p key={note} className="text-xs tracking-wide text-zinc-500 uppercase">
            {note}
          </p>
        ))}
      </footer>
    </section>
  );
}

function MasterTable({
  days,
}: {
  days: ReturnType<typeof masterDays>;
}) {
  return (
    <div>
      <div className="hidden grid-cols-[7.5rem_1fr_1fr_1fr] gap-3 border-b border-white/8 px-5 py-2 text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase lg:grid lg:px-7">
        <span>Date</span>
        <span>Varsity</span>
        <span>JV Red</span>
        <span>JV White</span>
      </div>
      {days.map((day, index) => {
        const showPhase = index === 0 || day.phase !== days[index - 1]?.phase;
        const byTeam = {
          varsity: day.games.filter((game) => game.team === "varsity"),
          "jv-red": day.games.filter((game) => game.team === "jv-red"),
          "jv-white": day.games.filter((game) => game.team === "jv-white"),
        };
        return (
          <div key={day.date}>
            {showPhase ? (
              <div className="bg-zinc-950/80 px-5 py-2 sm:px-7">
                <p className="font-heading text-lg tracking-[0.2em] text-red-400">
                  {phaseLabel[day.phase]}
                </p>
              </div>
            ) : null}
            <div className="grid gap-3 border-b border-white/8 px-5 py-4 even:bg-white/[0.02] lg:grid-cols-[7.5rem_1fr_1fr_1fr] lg:items-start lg:px-7">
              <div>
                <p className="text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">
                  {day.weekday}
                </p>
                <p className="font-heading text-lg tracking-wide text-white uppercase">
                  {formatGameDate(day.date)}
                </p>
              </div>
              <MasterCell label="Varsity" games={byTeam.varsity} />
              <MasterCell label="JV Red" games={byTeam["jv-red"]} />
              <MasterCell label="JV White" games={byTeam["jv-white"]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MasterCell({ label, games: cellGames }: { label: string; games: Game[] }) {
  return (
    <div>
      <p className="mb-1 text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase lg:hidden">
        {label}
      </p>
      {cellGames.length === 0 ? (
        <p className="text-sm text-zinc-600">—</p>
      ) : (
        cellGames.map((game) => (
          <p key={game.id} className="text-sm leading-6 text-zinc-200">
            {gameLine(game)}
          </p>
        ))
      )}
    </div>
  );
}

function TeamList({ days }: { days: ReturnType<typeof masterDays> }) {
  return (
    <ol>
      {days.map((day, index) => {
        const showPhase = index === 0 || day.phase !== days[index - 1]?.phase;
        return (
          <li key={day.date}>
            {showPhase ? (
              <div className="bg-zinc-950/80 px-5 py-2 sm:px-7">
                <p className="font-heading text-lg tracking-[0.2em] text-red-400">
                  {phaseLabel[day.phase]}
                </p>
              </div>
            ) : null}
            {day.games.map((game) => (
              <div
                key={game.id}
                className="grid gap-1 border-b border-white/8 px-5 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-center sm:px-7 even:bg-white/[0.02]"
              >
                <div>
                  <p className="text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">
                    {day.weekday}
                  </p>
                  <p className="font-heading text-lg tracking-wide text-white uppercase">
                    {formatGameDate(day.date)}
                  </p>
                </div>
                <p className="font-heading text-xl tracking-wide text-white uppercase">
                  {versusLabel(game.location)} {game.opponent}
                </p>
                <p className="text-sm text-zinc-400">
                  {[game.time ?? "Time TBA", game.venue, game.location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            ))}
          </li>
        );
      })}
    </ol>
  );
}
