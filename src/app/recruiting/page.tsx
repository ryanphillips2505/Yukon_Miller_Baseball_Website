import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/news";
import { program } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Recruiting" };

export default function RecruitingPage() {
  const commits = articles.filter((article) => article.category === "Commit");

  return (
    <div>
      <PageHero
        kicker="Next level"
        title="Recruiting"
        lede="College commits post here when a Miller makes it official. College coaches can reach the Yukon staff directly."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
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

        <section>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Commit board
          </h2>
          {commits.length === 0 ? (
            <EmptyState
              className="mt-4"
              title="No commits posted yet"
              body="When a Miller signs or commits, the announcement will sit on this board with the school — not a placeholder name."
            />
          ) : (
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {commits.map((commit) => (
                <li key={commit.slug}>
                  <Link
                    href={`/news/${commit.slug}`}
                    className="block rounded-2xl border border-white/10 bg-zinc-950 p-5 hover:border-red-700/50"
                  >
                    <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                      Commit
                    </p>
                    <p className="font-heading mt-2 text-xl tracking-wide text-white uppercase">
                      {commit.title}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400">{commit.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
