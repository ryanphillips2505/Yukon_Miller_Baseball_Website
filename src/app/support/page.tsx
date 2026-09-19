import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { hrc, officers, tcaStore } from "@/lib/support";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Home Run Club" };

export default function SupportPage() {
  const meetings = hrc.howItRuns[0];
  const mailing = hrc.howItRuns[1];
  const venmo = hrc.howItRuns[2];

  return (
    <div>
      <PageHero
        kicker="Boosters"
        title="Home Run Club"
        lede={hrc.about}
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:space-y-8 sm:px-6">
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
              Officers
            </h2>
            <a
              href={`mailto:${hrc.email}`}
              className={cn(buttonVariants(), "h-10 w-fit px-4")}
            >
              Email YHRC
            </a>
          </div>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            How it runs
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
                {meetings.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {meetings.body}
              </p>
            </div>
            <div className="space-y-6">
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

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            {hrc.donations.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
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

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            Volunteer
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            Varsity, JV Red, and JV White each need gate, concession, and
            field help. Pick a shift on the board.
          </p>
          <a
            href={hrc.volunteerSignup.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block font-heading text-2xl tracking-wide text-red-400 uppercase underline decoration-red-400 decoration-2 underline-offset-8 transition-colors hover:text-red-300 hover:decoration-red-300 sm:text-3xl"
          >
            {hrc.volunteerSignup.label}
          </a>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            {tcaStore.name}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            {tcaStore.blurb}
          </p>
          <a
            href={tcaStore.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 h-10 border-white/15 px-4",
            )}
          >
            Open TCA · code {tcaStore.code}
          </a>
        </section>
      </div>
    </div>
  );
}
