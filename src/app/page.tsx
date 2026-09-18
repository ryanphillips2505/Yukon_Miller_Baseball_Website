import { BrandLogo } from "@/components/brand-logo";
import { EmptyState } from "@/components/empty-state";
import { latestArticles } from "@/lib/news";
import { displayName, players } from "@/lib/roster";
import Link from "next/link";

export default function HomePage() {
  const news = latestArticles();

  return (
    <div>
      <section className="border-b border-white/8 bg-black">
        <div className="mx-auto max-w-lg px-4 pt-8 sm:px-6 sm:pt-10">
          <BrandLogo
            variant="state"
            priority
            sizes="(max-width: 640px) 70vw, 480px"
            className="mx-auto h-auto w-full"
          />
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-10 text-center sm:px-6 sm:pb-12">
          <h1 className="font-heading text-4xl leading-[0.92] text-white uppercase sm:text-6xl">
            Home of the Millers
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              The program
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-5xl">
              Players
            </h2>
          </div>
          <Link href="/roster" className="text-sm text-zinc-400 hover:text-white">
            Full roster
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {players.map((player) => (
            <Link
              key={player.id}
              href="/roster"
              className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-3 transition-colors hover:border-red-700/50"
            >
              <p className="font-heading text-base tracking-wide text-white uppercase sm:text-lg">
                {displayName(player)}
              </p>
              <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">
                B {player.bats} · T {player.throws}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
                Latest
              </p>
              <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-5xl">
                News
              </h2>
            </div>
            <Link href="/news" className="text-sm text-zinc-400 hover:text-white">
              All news
            </Link>
          </div>
          {news.length === 0 ? (
            <EmptyState
              className="mt-8"
              title="No updates posted"
              body="Commits and program notes will show here."
            />
          ) : (
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {news.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="rounded-2xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-red-700/50"
                >
                  <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                    {article.category}
                  </p>
                  <h3 className="font-heading mt-2 text-2xl tracking-wide text-white uppercase">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
