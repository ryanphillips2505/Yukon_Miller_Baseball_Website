"use client";

import { calendarSubscribeLinks, teamCalendarName } from "@/lib/calendar";
import { teams, type TeamId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

function SubscribeButtons({ team }: { team: TeamId }) {
  const links = useMemo(() => calendarSubscribeLinks(team), [team]);
  const [copied, setCopied] = useState(false);

  const actions = [
    { href: links.apple, label: "Apple" },
    { href: links.google, label: "Google", external: true },
    { href: links.outlook, label: "Outlook" },
  ] as const;

  async function copyFeed() {
    try {
      await navigator.clipboard.writeText(links.httpsUrl);
    } catch {
      const input = document.createElement("textarea");
      input.value = links.httpsUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          {...("external" in action && action.external
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
          className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
        >
          {action.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copyFeed}
        className="inline-flex h-8 items-center rounded-md border border-white/15 px-2.5 text-[0.68rem] tracking-[0.16em] text-zinc-200 uppercase transition-colors hover:border-white/35 hover:bg-white/5 hover:text-white"
      >
        {copied ? "Copied" : "Copy link"}
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
      <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-zinc-500 uppercase">
        Parent calendars
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
        Subscribe to a team and the games stay on your phone. Each event
        reminds you 30 minutes before first pitch. If we change a date or
        time on the website, the subscribed calendar updates too. Games
        without a listed time show 8:00 AM–5:00 PM as a placeholder.
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
        Apple and Outlook open the calendar app on your device so the feed
        stays in sync. On a Windows PC, if Outlook still opens in a browser,
        click Copy link, then in Outlook go to Add calendar → Subscribe from
        web and paste it. Google uses its own add-calendar page.
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
