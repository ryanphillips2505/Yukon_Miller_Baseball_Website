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
  "inline-flex h-9 items-center justify-center px-1 text-[0.62rem] font-medium tracking-[0.16em] text-zinc-300 uppercase transition-colors hover:bg-white/6 hover:text-white";

function SubscribeButtons({ team }: { team: TeamId }) {
  const links = useMemo(() => calendarSubscribeLinks(team), [team]);
  const [copied, setCopied] = useState(false);

  async function copyFeed() {
    setCopied(true);
    await writeClipboard(links.httpsUrl);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-4 grid grid-cols-4 overflow-hidden rounded-lg border border-white/12 bg-black/40">
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
    <div className="border-t border-white/8 pt-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
            Parent calendars
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            Subscribe to a team. Reminders fire 30 minutes before first pitch,
            and the calendar updates when the website schedule changes.
          </p>
        </div>
        <p className="pt-2 text-[0.62rem] tracking-[0.16em] text-zinc-600 uppercase sm:pt-0 sm:text-right">
          Copy, then paste in Apple or Outlook
        </p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {teams.map((team) => {
          const active = highlight === team.id;
          return (
            <div
              key={team.id}
              className={cn(
                "rounded-xl border px-4 py-4",
                active
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/10 bg-black/25",
              )}
            >
              <p className="font-heading text-2xl leading-none tracking-wide text-white uppercase">
                {team.label}
              </p>
              <p className="mt-1.5 text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
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
