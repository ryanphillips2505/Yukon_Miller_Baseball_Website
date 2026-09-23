import { PageHero } from "@/components/page-hero";
import { fields } from "@/lib/facilities";
import { publicPageSeo } from "@/lib/seo";
import { program, teams } from "@/lib/site";
import { hrc } from "@/lib/support";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Fan info", ...publicPageSeo("/fans") };

export default function FansPage() {
  return (
    <div>
      <PageHero
        kicker="Game day"
        title="Fan info"
        lede="Where to sit, which diamond, and how a Yukon baseball night actually works."
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              Getting there
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {program.directions}
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              {program.street}
              <br />
              {program.cityStateZip}
            </p>
            <a
              href={program.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-red-400 hover:text-red-300"
            >
              Open in maps
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
              Which field
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-zinc-400">
              {teams.map((team) => (
                <li key={team.id}>
                  <span className="text-white">{team.label}</span> — {team.field}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-500">
              Weather and time changes go to players through coaches and parent
              reps first, then post on the{" "}
              <Link href="/news" className="text-red-400 hover:text-red-300">
                news
              </Link>{" "}
              page.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
            <h3 className="font-heading text-lg tracking-wide text-white uppercase">
              Come watch
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Please come by and catch a game. Miller Field sits on the high
              school campus behind Yukon High School.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
            <h3 className="font-heading text-lg tracking-wide text-white uppercase">
              Help a night
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Gate, concession, and field work run through YUKON HS HOME RUN CLUB.
            </p>
            <a
              href={hrc.volunteerSignup.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-heading text-lg tracking-wide text-red-400 uppercase underline decoration-red-400 decoration-2 underline-offset-6 transition-colors hover:text-red-300 hover:decoration-red-300"
            >
              {hrc.volunteerSignup.label}
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
            <h3 className="font-heading text-lg tracking-wide text-white uppercase">
              Rep the Millers
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Preferred gear pricing is at the TCA store with code YUKON.
              Details live on the Home Run Club page.
            </p>
          </div>
        </section>

        <p className="text-sm text-zinc-500">
          {fields[0].name} — see the{" "}
          <Link href="/facilities" className="text-red-400 hover:text-red-300">
            facilities
          </Link>{" "}
          guide for more.
        </p>
      </div>
    </div>
  );
}
