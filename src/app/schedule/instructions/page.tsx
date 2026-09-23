import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendar instructions",
  description:
    "How to subscribe to Yukon High School Baseball team calendars on Apple, Google, and Outlook.",
  ...publicPageSeo("/schedule/instructions"),
};

const steps = [
  {
    title: "Apple",
    body: [
      "Tap Apple next to Varsity, JV Red, or JV White.",
      "When Calendar asks to subscribe, add the calendar. That keeps the feed live so date and time changes come through.",
      "If a file downloads instead, that copy will not update. Tap Copy on the Schedule page, then add a subscribed calendar and paste the link. On iPhone or iPad: Settings → Calendar → Accounts → Add Account → Other → Add Subscribed Calendar. On a Mac: Calendar → File → New Calendar Subscription.",
    ],
  },
  {
    title: "Google",
    body: [
      "Tap Google next to the team. A desktop browser works best.",
      "Sign in if asked, then add the Yukon calendar.",
      "If your phone does not offer to add it, tap Copy. In Google Calendar open Settings → Add calendar → From URL and paste the link.",
    ],
  },
  {
    title: "Outlook",
    body: [
      "Tap Outlook next to the team, or tap Copy if Outlook asks for a web address.",
      "Add it as a subscribed or internet calendar — not a one-time import of a downloaded file.",
      "In Outlook on the web: Add calendar → Subscribe from web, then paste the copied link.",
    ],
  },
];

export default function CalendarInstructionsPage() {
  return (
    <div>
      <header className="border-b border-white/8 bg-black">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-red-400 uppercase">
            Parent calendars
          </p>
          <h1 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-5xl">
            Instructions
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-300 italic">
            Each device you sync this calendar to has its own refresh settings.
            Please check them to ensure you get the latest updates.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <section>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Subscribe from the schedule
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            On the Schedule page, each team has Apple, Google, Outlook, and
            Copy. Subscribe separately to Varsity, JV Red, and JV White if you
            follow more than one team.
          </p>
        </section>

        {steps.map((step) => (
          <section
            key={step.title}
            className="rounded-2xl border border-white/10 bg-zinc-950 p-6"
          >
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              {step.title}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-400">
              {step.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>
        ))}

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            After you subscribe
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
            <li>You get a 30-minute reminder before first pitch.</li>
            <li>
              Games without a posted time show 8:00 AM to 5:00 PM as a
              placeholder until the time is set.
            </li>
            <li>
              When the website schedule changes, the subscribed calendar updates
              after your device refreshes.
            </li>
          </ul>
        </section>

        <Link
          href="/schedule"
          className={cn(buttonVariants(), "h-10 px-5 uppercase")}
        >
          Back to schedule
        </Link>
      </div>
    </div>
  );
}
