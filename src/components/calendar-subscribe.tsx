"use client";

import { calendarSubscribeLinks, teamCalendarName } from "@/lib/calendar";
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

function SubscribeButtons({ team }: { team: TeamId }) {
  const links = useMemo(() => calendarSubscribeLinks(team), [team]);
  const [copied, setCopied] = useState(false);

  async function copyFeed() {
    setCopied(true);
    await writeClipboard(links.httpsUrl);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <a
        href={links.httpsUrl}
        className="mb-3 block break-all font-mono text-[0.68rem] leading-5 text-zinc-400 underline-offset-2 hover:text-white hover:underline"
      >
        {links.httpsUrl}
      </a>
      <div className="flex flex-wrap gap-2">
        <a
          href={links.httpsUrl}
          className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          Apple
        </a>
        <a
          href={links.google}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          Google
        </a>
        <a
          href={links.httpsUrl}
          className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          Outlook
        </a>
        <button
          type="button"
          onClick={copyFeed}
          className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

export function CalendarSubscribe({
  highlight,
}: {
  highlight?: TeamId | "master";
}) {
  return (
    <div className="border-t border-white/8 pt-4">
      <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
        Parent calendars
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
        Each team uses a regular https address, like
        https://www.yukonbaseball.com/calendar/varsity.ics. Paste that into
        Apple Calendar or Outlook. Google can use the Google button. Each
        event reminds you 30 minutes before first pitch, and the calendar
        updates when we change a date or time. Games without a listed time
        show 8:00 AM–5:00 PM as a placeholder.
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
        Outlook: Add calendar → Subscribe from web, then paste the https
        link. Apple: Calendar → Add Calendar → Add Subscription Calendar,
        then paste the same link.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {teams.map((team) => {
          const active = highlight === team.id;
          return (
            <div
              key={team.id}
              className={cn(
                "rounded-xl border px-4 py-3",
                active
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/10 bg-black/20",
              )}
            >
              <p className="font-heading text-lg tracking-wide text-white uppercase">
                {team.label}
              </p>
              <p className="mt-0.5 mb-3 text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
                {teamCalendarName(team.id)}
              </p>
              <SubscribeButtons team={team.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
