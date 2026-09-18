import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { sponsorCount, sponsorshipForm } from "@/lib/sponsors";
import { hrc, officers, sponsorshipTiers, tcaStore } from "@/lib/support";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Home Run Club" };

export default function SupportPage() {
  return (
    <div>
      <PageHero
        kicker="Boosters"
        title="Home Run Club"
        lede={hrc.about}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section className="overflow-hidden rounded-2xl border border-red-700/35 bg-[linear-gradient(135deg,#2a0b12_0%,#0a0a0c_60%)] p-6 sm:p-8">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
            2026 partners
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-4xl">
            {sponsorCount} names on the wall
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            The full 2026 sign sheet is posted — scoreboard, Cycle, Grand Slam,
            outfield banners, and the rest of the board.
          </p>
          <Link
            href="/sponsors"
            className={cn(buttonVariants(), "mt-6 h-10 px-4 uppercase")}
          >
            See the sponsors
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              Officers
            </h2>
            <ul className="mt-4 space-y-3">
              {officers.map((officer) => (
                <li key={officer.name} className="flex justify-between gap-4 text-sm">
                  <span className="text-white">{officer.name}</span>
                  <span className="text-zinc-500">{officer.role}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${hrc.email}`}
              className={cn(buttonVariants(), "mt-6 h-10 px-4")}
            >
              Email YHRC
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              How it runs
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{hrc.meetings}</p>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{hrc.payment}</p>
            <p className="mt-4 text-sm text-zinc-500">{hrc.poBox}</p>
            <p className="mt-2 text-sm text-zinc-500">Venmo {hrc.venmo}</p>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
                2026–27 sponsorships
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Yukon Baseball will build a custom package if these tiers do not
                fit. Artwork and design follow after you email the club.
              </p>
            </div>
            <a
              href={sponsorshipForm.href}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants(), "h-10 px-4 uppercase")}
            >
              Open the form
            </a>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {sponsorshipTiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border border-white/10 bg-zinc-950 p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-xl tracking-wide text-white uppercase">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-red-400">{tier.price}</p>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                {tier.renewal ? (
                  <p className="mt-3 text-xs text-zinc-600">{tier.renewal}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Volunteer
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Varsity, JV Red, and JV White each need gate, concession, and
            field help. Signup boards post here when the season list opens —
            last year’s Signup.com links are retired so parents are not
            booking the wrong year.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            {tcaStore.name}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            {tcaStore.blurb}
          </p>
          <a
            href={tcaStore.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-4 h-10 border-white/15 px-4",
            )}
          >
            Open TCA · code {tcaStore.code}
          </a>
        </section>
      </div>
    </div>
  );
}
