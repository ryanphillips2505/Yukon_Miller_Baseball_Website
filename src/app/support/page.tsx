import { buttonVariants } from "@/components/ui/button";
import { hrc, officers, tcaStore } from "@/lib/support";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Home Run Club" };

export default function SupportPage() {
  const meetings = hrc.howItRuns[0];
  const mailing = hrc.howItRuns[1];
  const venmo = hrc.howItRuns[2];

  return (
    <div>
      <header className="border-b border-white/8 bg-black">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-10">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-red-400 uppercase">
              Boosters
            </p>
            <h1 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-5xl">
              Home Run Club
            </h1>
            {hrc.about.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-2xl text-base leading-7 text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 italic">
              * {hrc.affiliationNote}
            </p>
          </div>

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
                Officers
              </h2>
              <a
                href={`mailto:${hrc.email}`}
                className={cn(buttonVariants(), "h-9 shrink-0 px-3 text-xs uppercase")}
              >
                Email YHRC
              </a>
            </div>
            <ul className="mt-5 space-y-2.5">
              {officers.map((officer) => (
                <li
                  key={officer.name}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="text-white">{officer.name}</span>
                  <span className="shrink-0 text-zinc-500">{officer.role}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8 sm:space-y-5 sm:px-6 sm:py-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              How it runs
            </h2>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
                  {meetings.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {meetings.body}
                </p>
                {meetings.note ? (
                  <p className="mt-2 text-sm leading-6 text-zinc-400 italic">
                    * {meetings.note}
                  </p>
                ) : null}
                <Link
                  href="/minutes"
                  className={cn(buttonVariants(), "mt-4 h-10 w-fit px-4")}
                >
                  Meeting Minutes
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
                    {mailing.title}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-400">
                    {mailing.body}
                  </p>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
                    {venmo.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {venmo.body}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              {hrc.donations.title}
            </h2>
            <p className="mt-5 text-sm leading-6 text-zinc-400">
              {hrc.donations.body}
            </p>
            <a
              href={hrc.venmoHref}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants(), "mt-6 h-10 w-fit px-4")}
            >
              Pay HRC Venmo
            </a>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              Volunteer
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Varsity, JV Red, and JV White each need gate, concession, and
              field help. Pick a shift on the board.
            </p>
            <a
              href={hrc.volunteerSignup.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block font-heading text-xl tracking-wide text-red-400 uppercase underline decoration-red-400 decoration-2 underline-offset-8 transition-colors hover:text-red-300 hover:decoration-red-300"
            >
              {hrc.volunteerSignup.label}
            </a>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              {tcaStore.name}
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              {tcaStore.blurb}
            </p>
            <a
              href={tcaStore.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-5 h-10 border-white/15 px-4",
              )}
            >
              Open TCA · code {tcaStore.code}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
