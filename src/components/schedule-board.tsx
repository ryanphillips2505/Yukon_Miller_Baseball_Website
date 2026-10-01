"use client";

import { CalendarSubscribe } from "@/components/calendar-subscribe";
import {
  formatGameDate,
  formatGameScore,
  formatWeekdayShort,
  gameCount,
  gameResult,
  gamesForView,
  isAwayGame,
  masterDays,
  phaseGameCount,
  phaseLabel,
  recordForView,
  regularSeasonCount,
  scheduleNotes,
  scrimmageCount,
  versusLabel,
  type Game,
  type GamePhase,
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

const shell = "mx-auto max-w-[1320px] px-4 sm:px-6";

function teamLabel(id: TeamId) {
  return teams.find((team) => team.id === id)?.label ?? id;
}

function matchupClass(game: Game) {
  return isAwayGame(game.location) ? "text-red-400" : "text-white";
}

function GameMatchup({ game, className }: { game: Game; className?: string }) {
  const field = fieldForGame(game);
  const href = field ? mapsUrlForField(field) : undefined;
  const color = matchupClass(game);
  const opponent = (
    <span className={cn(color, "min-w-0")}>{game.opponent}</span>
  );

  return (
    <span className={cn("inline-flex min-w-0 items-baseline gap-2", className)}>
      <span className="shrink-0 text-[0.7rem] tracking-[0.16em] text-zinc-500 uppercase">
        {versusLabel(game.location)}
      </span>
      {!href || !field ? (
        opponent
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(color, "min-w-0 underline-offset-4 hover:underline")}
          aria-label={`Directions to ${field.name}`}
        >
          {game.opponent}
        </a>
      )}
    </span>
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

function PhaseHeader({
  phase,
  count,
  compact,
}: {
  phase: GamePhase;
  count: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 border-b border-white/10 pb-2",
        compact ? "pt-4" : "pt-6",
      )}
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
        {phaseLabel[phase]}
      </p>
      <p className="text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase">
        {count} {count === 1 ? "Game" : "Games"}
      </p>
    </div>
  );
}

function DateStamp({ weekday, date }: { weekday: string; date: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.58rem] tracking-[0.18em] text-zinc-500 uppercase">
        {formatWeekdayShort(weekday)}
      </p>
      <p className="font-heading text-base leading-tight tracking-wide text-white uppercase sm:text-lg">
        {formatGameDate(date)}
      </p>
    </div>
  );
}

function GameDetail({
  game,
  className,
}: {
  game: Game;
  className?: string;
}) {
  const mark = gameResult(game);
  const score = formatGameScore(game);
  if (mark && score) {
    return (
      <p className={cn("text-sm tracking-wide uppercase", className)}>
        <span className={mark === "W" ? "text-red-400" : "text-zinc-400"}>
          {mark}
        </span>{" "}
        <span className="text-zinc-300">{score}</span>
      </p>
    );
  }

  return (
    <div className={cn("text-sm tracking-wide text-zinc-400 uppercase", className)}>
      <p>{game.time ?? "TBA"}</p>
      {game.venue ? (
        <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] text-zinc-500">
          {game.venue}
        </p>
      ) : null}
    </div>
  );
}

function GameCopy({ game }: { game: Game }) {
  return (
    <div className="min-w-0">
      <p className="font-heading text-xl leading-none tracking-wide uppercase">
        <GameMatchup game={game} />
      </p>
      <GameDetail game={game} className="mt-1.5" />
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[4.5rem] text-left sm:text-right">
      <p className="font-heading text-3xl leading-none text-white sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-[0.58rem] tracking-[0.18em] text-zinc-500 uppercase">
        {label}
      </p>
    </div>
  );
}

export function ScheduleBoard() {
  const [view, setView] = useState<ScheduleView>("master");
  const visible = useMemo(() => gamesForView(view), [view]);
  const days = useMemo(() => masterDays(visible), [visible]);
  const listedGames = useMemo(() => gameCount(visible), [visible]);
  const standing = useMemo(() => recordForView(view), [view]);
  const regularGames = useMemo(() => regularSeasonCount(visible), [visible]);
  const scrimmages = useMemo(() => scrimmageCount(visible), [visible]);
  const phaseCounts = useMemo(
    () => ({
      scrimmage: phaseGameCount(visible, "scrimmage"),
      regular: phaseGameCount(visible, "regular"),
      postseason: phaseGameCount(visible, "postseason"),
    }),
    [visible],
  );

  return (
    <section>
      <header className="border-b border-white/10">
        <div
          className={cn(
            shell,
            "flex flex-col gap-4 pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-5",
          )}
        >
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
              2027
            </p>
            <h1 className="font-heading mt-1.5 text-4xl leading-none tracking-wide text-white uppercase sm:text-6xl">
              {view === "master" ? "Schedule" : teamLabel(view)}
            </h1>
          </div>
          <div className="flex flex-wrap items-end gap-5 sm:justify-end sm:gap-7">
            {view === "master" ? (
              <>
                <StatBlock
                  value={String(listedGames).padStart(2, "0")}
                  label="Games"
                />
                <StatBlock value={standing.display} label={standing.label} />
              </>
            ) : (
              <>
                <StatBlock value={standing.display} label="Record" />
                <StatBlock
                  value={String(regularGames)}
                  label="Regular Season"
                />
                <StatBlock value={String(scrimmages)} label="Scrimmages" />
              </>
            )}
          </div>
        </div>
        <div className={cn(shell, "pt-3")}>
          <HomeAwayKey />
        </div>
        <div className={cn(shell, "mt-3 flex gap-0.5 overflow-x-auto")}>
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "relative shrink-0 px-2.5 py-2 text-[0.72rem] font-medium tracking-[0.16em] uppercase transition-colors",
                view === item.id ? "text-white" : "text-zinc-500 hover:text-white",
                view === item.id &&
                  "after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:bg-[#c8102e]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className={shell}>
        {view === "master" ? (
          <MasterTable days={days} phaseCounts={phaseCounts} />
        ) : (
          <TeamList days={days} phaseCounts={phaseCounts} />
        )}

        {view === "master" ? (
          <CalendarSubscribe highlight={view} />
        ) : (
          <CalendarSubscribe team={view} />
        )}

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
  phaseCounts,
}: {
  days: ReturnType<typeof masterDays>;
  phaseCounts: Record<GamePhase, number>;
}) {
  return (
    <div>
      <div className="hidden grid-cols-[5.75rem_1fr_1fr_1fr] gap-4 border-b border-white/8 py-2.5 text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase lg:grid">
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
              <PhaseHeader
                phase={day.phase}
                count={phaseCounts[day.phase]}
                compact={index === 0}
              />
            ) : null}
            <div
              className={cn(
                "grid gap-4 border-b border-white/8 py-3 lg:grid-cols-[5.75rem_1fr_1fr_1fr] lg:items-start",
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

function TeamList({
  days,
  phaseCounts,
}: {
  days: ReturnType<typeof masterDays>;
  phaseCounts: Record<GamePhase, number>;
}) {
  return (
    <ol>
      {days.map((day, index) => {
        const showPhase = index === 0 || day.phase !== days[index - 1]?.phase;
        return (
          <li key={day.date}>
            {showPhase ? (
              <PhaseHeader
                phase={day.phase}
                count={phaseCounts[day.phase]}
                compact={index === 0}
              />
            ) : null}
            {day.games.map((game) => (
              <div
                key={game.id}
                className={cn(
                  "grid grid-cols-1 gap-2 border-b border-white/8 py-3 sm:grid-cols-[5.75rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4",
                  index % 2 === 1 && "bg-white/[0.015]",
                )}
              >
                <DateStamp weekday={day.weekday} date={day.date} />
                <p className="font-heading min-w-0 text-xl tracking-wide uppercase">
                  <GameMatchup game={game} />
                </p>
                <GameDetail game={game} className="sm:text-right" />
              </div>
            ))}
          </li>
        );
      })}
    </ol>
  );
}
