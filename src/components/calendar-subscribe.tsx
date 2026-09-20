"use client";

import { calendarSubscribeLinks } from "@/lib/calendar";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

async function writeClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
}

const cellClass =
  "inline-flex h-6 flex-1 items-center justify-center px-0.5 text-[0.5rem] font-medium tracking-[0.06em] text-zinc-300 uppercase transition-colors hover:bg-white/6 hover:text-white md:h-9 md:text-[0.62rem] md:tracking-[0.16em]";

function SubscribeButtons({ team }: { team: TeamId }) {
  const links = useMemo(() => calendarSubscribeLinks(team), [team]);
  const [copied, setCopied] = useState(false);

  async function copyFeed() {
    setCopied(true);
    await writeClipboard(links.httpsUrl);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-w-0 flex-1 overflow-hidden rounded-md border border-white/12 bg-black/40 md:mt-4 md:flex-none md:w-full md:rounded-lg">
      <a href={links.httpsUrl} className={cellClass}>
        Apple
      </a>
      <a
        href={links.google}
        target="_blank"
        rel="noreferrer"
        className={cn(cellClass, "border-l border-white/10")}
      >
        Google
      </a>
      <a
        href={links.httpsUrl}
        className={cn(cellClass, "border-l border-white/10")}
      >
        Outlook
      </a>
      <button
        type="button"
        onClick={copyFeed}
        className={cn(cellClass, "border-l border-white/10")}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function CalendarSubscribe({
  highlight,
}: {
  highlight?: TeamId | "master";
}) {
  return (
    <div className="border-t border-white/8 pt-4 md:pt-5">
      <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
        Parent calendars
      </p>
      <p className="mt-1.5 text-xs leading-5 text-zinc-500 md:mt-2 md:max-w-xl md:text-sm md:leading-6 md:text-zinc-400">
        30-minute reminder before first pitch. Updates when the schedule
        changes.
      </p>
      <div className="mt-3 divide-y divide-white/8 overflow-hidden rounded-xl border border-white/10 md:mt-4 md:grid md:grid-cols-3 md:gap-3 md:divide-y-0 md:overflow-visible md:rounded-none md:border-0">
        {teams.map((team) => {
          const active = highlight === team.id;
          return (
            <div
              key={team.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2 md:flex-col md:items-stretch md:rounded-xl md:border md:px-4 md:py-4",
                active
                  ? "bg-white/[0.04] md:border-white/20"
                  : "bg-black/25 md:border-white/10",
              )}
            >
              <p className="font-heading w-[5.25rem] shrink-0 text-base leading-none tracking-wide text-white uppercase md:w-auto md:text-2xl">
                {team.label}
              </p>
              <p className="mt-1.5 hidden text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase md:block">
                30-min reminder
              </p>
              <SubscribeButtons team={team.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
