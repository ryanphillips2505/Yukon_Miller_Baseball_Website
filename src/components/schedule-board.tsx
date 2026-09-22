"use client";

import { CalendarSubscribe } from "@/components/calendar-subscribe";
import {
  formatGameDate,
  gameCount,
  gamesForView,
  isAwayGame,
  masterDays,
  phaseLabel,
  scheduleNotes,
  versusLabel,
  type Game,
  type ScheduleView,
} from "@/lib/schedule";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { fieldForGame, mapsUrlForField } from "@/lib/venues";
import { useMemo, useState } from "react";

const views: { id: ScheduleView; label: string }[] = [
  { id: "master", label: "Master" },
  ...teams.map((team) => ({ id: team.id, label: team.label })),
];

function teamLabel(id: TeamId) {
  return teams.find((team) => team.id === id)?.label ?? id;
}

function gameMeta(game: Game) {
  return [game.time, game.venue].filter(Boolean).join(" · ") || "TBA";
}

function matchupClass(game: Game) {
  return isAwayGame(game.location) ? "text-red-400" : "text-white";
}

function GameMatchup({ game, className }: { game: Game; className?: string }) {
  const field = fieldForGame(game);
  const href = field ? mapsUrlForField(field) : undefined;
  const label = `${versusLabel(game.location)} ${game.opponent}`;
  const color = cn(matchupClass(game), className);

  if (!href || !field) {
    return <span className={color}>{label}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(color, "underline-offset-4 hover:underline")}
      aria-label={`Directions to ${field.name}`}
    >
      {label}
    </a>
  );
}

function HomeAwayKey() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.62rem] tracking-[0.18em] uppercase">
      <span className="inline-flex items-center gap-2 text-white">
        <span className="size-1.5 rounded-full bg-white" aria-hidden />
        Home · vs
      </span>
      <span className="inline-flex items-center gap-2 text-red-400">
        <span className="size-1.5 rounded-full bg-[#c8102e]" aria-hidden />
        Away · @
      </span>
    </div>
  );
}

function PhaseHeader({ phase }: { phase: Game["phase"] }) {
  return (
    <div className="border-b border-white/8 py-2.5">
      <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
        {phaseLabel[phase]}
      </p>
    </div>
  );
}

function DateStamp({ weekday, date }: { weekday: string; date: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
        {weekday}
      </p>
      <p className="font-heading text-lg tracking-wide text-white uppercase">
        {formatGameDate(date)}
      </p>
    </div>
  );
}

function GameCopy({ game }: { game: Game }) {
  return (
    <div className="min-w-0">
      <p className="font-heading text-xl leading-none tracking-wide uppercase">
        <GameMatchup game={game} />
      </p>
      <p className="mt-1.5 text-sm tracking-wide text-zinc-400 uppercase">
        {gameMeta(game)}
      </p>
    </div>
  );
}

export function ScheduleBoard() {
  const [view, setView] = useState<ScheduleView>("master");
  const visible = useMemo(() => gamesForView(view), [view]);
  const days = useMemo(() => masterDays(visible), [visible]);
  const listedGames = useMemo(() => gameCount(visible), [visible]);

  return (
    <section>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 pt-6 sm:px-6 sm:pt-8">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
              2027
            </p>
            <h1 className="font-heading mt-2 text-4xl leading-none tracking-wide text-white uppercase sm:text-6xl">
              {view === "master" ? "Schedule" : teamLabel(view)}
            </h1>
          </div>
          <div className="pb-1 text-right">
            <p className="font-heading text-4xl leading-none text-white sm:text-5xl">
              {String(listedGames).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.62rem] tracking-[0.22em] text-zinc-500 uppercase">
              Games
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <HomeAwayKey />
          <div className="mt-5">
            <CalendarSubscribe highlight={view} />
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "relative shrink-0 px-3 py-3 text-[0.8rem] font-medium tracking-[0.14em] uppercase transition-colors",
                view === item.id ? "text-white" : "text-zinc-500 hover:text-white",
                view === item.id &&
                  "after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:bg-[#c8102e]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {view === "master" ? <MasterTable days={days} /> : <TeamList days={days} />}

        <footer className="space-y-1 border-t border-white/8 py-5">
          {scheduleNotes.map((note) => (
            <p key={note} className="text-xs tracking-wide text-zinc-500 uppercase">
              {note}
            </p>
          ))}
        </footer>
      </div>
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
      <div className="hidden grid-cols-[7.5rem_1fr_1fr_1fr] gap-4 border-b border-white/8 py-3 text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase lg:grid">
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
            {showPhase ? <PhaseHeader phase={day.phase} /> : null}
            <div
              className={cn(
                "grid gap-4 border-b border-white/8 py-3.5 lg:grid-cols-[7.5rem_1fr_1fr_1fr] lg:items-start",
                index % 2 === 1 && "bg-white/[0.015]",
              )}
            >
              <DateStamp weekday={day.weekday} date={day.date} />
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

function MasterCell({
  label,
  games: cellGames,
}: {
  label: string;
  games: Game[];
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase lg:hidden">
        {label}
      </p>
      {cellGames.length === 0 ? (
        <p className="text-sm text-zinc-600">—</p>
      ) : (
        <div className="space-y-3">
          {cellGames.map((game) => (
            <GameCopy key={game.id} game={game} />
          ))}
        </div>
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
            {showPhase ? <PhaseHeader phase={day.phase} /> : null}
            {day.games.map((game) => (
              <div
                key={game.id}
                className={cn(
                  "grid gap-1 border-b border-white/8 py-3.5 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-center",
                  index % 2 === 1 && "bg-white/[0.015]",
                )}
              >
                <DateStamp weekday={day.weekday} date={day.date} />
                <p className="font-heading text-xl tracking-wide uppercase">
                  <GameMatchup game={game} />
                </p>
                <p className="text-sm tracking-wide text-zinc-400 uppercase sm:text-right">
                  {gameMeta(game)}
                </p>
              </div>
            ))}
          </li>
        );
      })}
    </ol>
  );
}
