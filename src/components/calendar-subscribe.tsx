"use client";

import { buttonVariants } from "@/components/ui/button";
import { calendarSubscribeLinks } from "@/lib/calendar";
import { gaCalendarEvents, gaEvent } from "@/lib/ga";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import Link from "next/link";
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
  "inline-flex min-h-8 flex-1 items-center justify-center px-2 py-2 text-[0.58rem] font-medium tracking-[0.1em] text-zinc-300 uppercase transition-colors hover:bg-white/6 hover:text-white";

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
        {copied ? "Copied" : "Copy Link"}
      </button>
    </div>
  );
}

function InstructionsLink({ className }: { className?: string }) {
  return (
    <Link
      href="/schedule/instructions"
      className={cn(
        buttonVariants(),
        "h-8 px-3 text-[0.62rem] tracking-[0.12em] uppercase",
        className,
      )}
    >
      Calendar Instructions
    </Link>
  );
}

export function CalendarSubscribe({
  highlight,
  team,
}: {
  highlight?: TeamId | "master";
  team?: TeamId;
}) {
  const solo = team ? teams.find((item) => item.id === team) : undefined;

  if (solo) {
    return (
      <div className="border-t border-white/8 pt-6">
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white uppercase">
          Add {solo.label} to your calendar
        </p>
        <p className="mt-1.5 max-w-xl text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6 sm:text-zinc-400">
          Automatically updates when the schedule changes.
          <br />
          30-minute reminder before first pitch.
        </p>
        <div className="mt-3 max-w-xl">
          <SubscribeButtons team={solo.id} />
        </div>
        <div className="mt-3">
          <InstructionsLink />
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-white/8 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
          Parent calendars
        </p>
        <InstructionsLink />
      </div>
      <p className="mt-1.5 max-w-xl text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6 sm:text-zinc-400">
        30-minute reminder before first pitch. Updates when the schedule
        changes.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {teams.map((item) => {
          const active = highlight === item.id;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                active
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/10 bg-black/25",
              )}
            >
              <p className="font-heading w-[5.5rem] shrink-0 text-lg leading-none tracking-wide text-white uppercase">
                {item.label}
              </p>
              <SubscribeButtons team={item.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
