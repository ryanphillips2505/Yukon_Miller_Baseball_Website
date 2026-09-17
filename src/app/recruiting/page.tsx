import { CommitBoard } from "@/components/commit-board";
import { PageHero } from "@/components/page-hero";
import { program } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Recruiting" };

export default function RecruitingPage() {
  return (
    <div>
      <PageHero
        kicker="Next level"
        title="Recruiting"
        lede="College commits post here when a Miller makes it official. College coaches can reach the Yukon staff directly."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <CommitBoard />

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            For college coaches
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Film, visit windows, and player contacts go through the high school
            staff. Email{" "}
            <a className="text-red-400 hover:text-red-300" href={`mailto:${program.email}`}>
              {program.email}
            </a>{" "}
            and include the player’s name, your school, and what you need.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block text-sm text-white underline-offset-4 hover:underline"
          >
            Use the contact form
          </Link>
        </section>
      </div>
    </div>
  );
}
