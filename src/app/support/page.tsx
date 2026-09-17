import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { hrc, officers, sponsorshipTiers, tcaStore } from "@/lib/support";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

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
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            What HRC has hosted
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {hrc.history.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/8 bg-zinc-950 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            2026–27 sponsorships
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Yukon Baseball will build a custom package if these tiers do not
            fit. Artwork and design follow after you email the club.
          </p>
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
