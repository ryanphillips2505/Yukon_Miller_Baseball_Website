import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/news";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div>
      <PageHero kicker="Updates" title="News" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {articles.length === 0 ? (
          <EmptyState
            title="No stories posted"
            body="The first update will be a real one. Weather and time changes also live here so parents are not hunting group texts."
          />
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/news/${article.slug}`}
                  className="block rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-red-700/50"
                >
                  <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                    {article.category} · {article.date}
                  </p>
                  <h2 className="font-heading mt-2 text-2xl tracking-wide text-white uppercase">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {article.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
