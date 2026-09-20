"use client";

import { buttonVariants } from "@/components/ui/button";
import { calendarSubscribeLinks } from "@/lib/calendar";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
    <div className="border-t border-white/8 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
          Parent calendars
        </p>
        <Link
          href="/schedule/instructions"
          className={cn(
            buttonVariants(),
            "h-7 px-3 text-[0.62rem] tracking-[0.12em] uppercase",
          )}
        >
          Instructions
        </Link>
      </div>
      <p className="mt-1.5 max-w-xl text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6 sm:text-zinc-400">
        30-minute reminder before first pitch. Updates when the schedule
        changes.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {teams.map((team) => {
          const active = highlight === team.id;
          return (
            <div
              key={team.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                active
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/10 bg-black/25",
              )}
            >
              <p className="font-heading w-[5.5rem] shrink-0 text-lg leading-none tracking-wide text-white uppercase">
                {team.label}
              </p>
              <SubscribeButtons team={team.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
