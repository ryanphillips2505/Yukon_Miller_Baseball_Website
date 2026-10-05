"use client";

import { calendarSubscribeLinks } from "@/lib/calendar";
import { gaCalendarEvents, gaEvent } from "@/lib/ga";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import { useMemo, useState } from "react";

function trackCalendarClick(
  ...events: Array<(typeof gaCalendarEvents)[keyof typeof gaCalendarEvents]>
) {
  for (const event of events) {
    track(event);
    gaEvent(event);
  }
}

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
  "inline-flex h-7 flex-1 items-center justify-center px-1 text-[0.52rem] font-medium tracking-[0.08em] text-zinc-300 uppercase transition-colors hover:bg-white/6 hover:text-white";

function SubscribeButtons({ team }: { team: TeamId }) {
  const links = useMemo(() => calendarSubscribeLinks(team), [team]);
  const [copied, setCopied] = useState(false);

  async function copyFeed() {
    setCopied(true);
    await writeClipboard(links.httpsUrl);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-w-0 flex-1 overflow-hidden rounded-md border border-white/12 bg-black/40">
      <a
        href={links.apple}
        className={cellClass}
        onClick={() =>
          trackCalendarClick(gaCalendarEvents.apple, gaCalendarEvents.ics)
        }
      >
        Apple
      </a>
      <a
        href={links.google}
        target="_blank"
        rel="noreferrer"
        className={cn(cellClass, "border-l border-white/10")}
        onClick={() => trackCalendarClick(gaCalendarEvents.google)}
      >
        Google
      </a>
      <a
        href={links.outlook}
        target="_blank"
        rel="noreferrer"
        className={cn(cellClass, "border-l border-white/10")}
        onClick={() =>
          trackCalendarClick(gaCalendarEvents.outlook, gaCalendarEvents.ics)
        }
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

export function CalendarSubscribeBoards() {
  return (
    <div className="grid gap-2">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5"
        >
          <p className="font-heading w-[5.5rem] shrink-0 text-lg leading-none tracking-wide text-white uppercase">
            {team.label}
          </p>
          <SubscribeButtons team={team.id} />
        </div>
      ))}
    </div>
  );
}
