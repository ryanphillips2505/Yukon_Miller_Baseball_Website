import { BrandLogo } from "@/components/brand-logo";
import { buttonVariants } from "@/components/ui/button";
import { commits } from "@/lib/commits";
import { latestArticles } from "@/lib/news";
import { players } from "@/lib/roster";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [featured, ...moreNews] = latestArticles(3);
  const [leadCommit, ...otherCommits] = commits;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/8 bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,16,46,0.22),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
        <div className="pointer-events-none absolute top-8 left-1/2 w-[min(90vw,52rem)] -translate-x-1/2 opacity-[0.14]">
          <BrandLogo
            variant="state"
            priority
            sizes="(max-width: 768px) 90vw, 832px"
            className="h-auto w-full"
          />
        </div>
        <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col items-center justify-end px-4 pb-14 text-center sm:min-h-[40rem] sm:px-6 sm:pb-16">
          <p className="text-[0.7rem] font-semibold tracking-[0.36em] text-red-400 uppercase">
            Yukon High School Baseball
          </p>
          <h1 className="font-heading mt-4 text-7xl leading-[0.82] text-white uppercase sm:text-8xl lg:text-[9.5rem]">
            Millers
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/roster"
              className={cn(buttonVariants(), "h-11 px-6 text-sm uppercase")}
            >
              Players
            </Link>
            <Link
              href="/news"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-white/20 px-6 text-sm uppercase",
              )}
            >
              News
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                Players
              </p>
              <h2 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-6xl">
                Spotlight
              </h2>
            </div>
            <Link
              href="/roster"
              className="text-sm tracking-wide text-zinc-400 uppercase hover:text-white"
            >
              Roster · {players.length}
            </Link>
          </div>

          {leadCommit ? (
            <Link
              href={leadCommit.newsSlug ? `/news/${leadCommit.newsSlug}` : "/recruiting"}
              className="group relative mt-10 block overflow-hidden rounded-2xl border border-white/12 bg-zinc-950"
            >
              <div
                className="absolute inset-y-0 left-0 w-1.5"
                style={{
                  background: `linear-gradient(180deg, ${leadCommit.colors.secondary}, ${leadCommit.colors.primary})`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(200,16,46,0.16),transparent_36%)]" />
              <div className="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="inline-flex rounded-full border border-[#c8102e]/50 bg-[#c8102e]/15 px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.18em] text-red-300 uppercase">
                    Committed
                  </p>
                  <h3 className="font-heading mt-4 text-5xl leading-[0.88] tracking-wide text-white uppercase sm:text-7xl">
                    {leadCommit.player}
                  </h3>
                  <p className="mt-5 text-lg text-[#f4f1ea] sm:text-xl">
                    {leadCommit.school}
                  </p>
                  <p className="mt-2 text-sm tracking-wide text-zinc-400 uppercase">
                    {leadCommit.mascot} · {leadCommit.division}
                  </p>
                </div>
                <div className="flex h-28 w-56 items-center justify-center rounded-xl bg-[#f4f1ea] p-4">
                  <Image
                    src={leadCommit.logo.src}
                    alt={leadCommit.logo.alt}
                    width={leadCommit.logo.width}
                    height={leadCommit.logo.height}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </Link>
          ) : null}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {otherCommits.map((commit) => (
              <Link
                key={commit.id}
                href={commit.newsSlug ? `/news/${commit.newsSlug}` : "/recruiting"}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-colors hover:border-red-700/40 sm:p-8"
              >
                <div
                  className="absolute inset-y-0 left-0 w-1.5"
                  style={{
                    background: `linear-gradient(180deg, ${commit.colors.secondary}, ${commit.colors.primary})`,
                  }}
                />
                <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-red-400 uppercase">
                  Committed
                </p>
                <h3 className="font-heading mt-3 text-3xl tracking-wide text-white uppercase sm:text-4xl">
                  {commit.player}
                </h3>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="text-sm leading-6 text-zinc-400">
                    {commit.school}
                    <br />
                    {commit.mascot}
                  </p>
                  <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg bg-[#f4f1ea] p-2">
                    <Image
                      src={commit.logo.src}
                      alt={commit.logo.alt}
                      width={commit.logo.width}
                      height={commit.logo.height}
                      className="h-full w-auto max-w-full object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                Latest
              </p>
              <h2 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-6xl">
                News
              </h2>
            </div>
            <Link
              href="/news"
              className="text-sm tracking-wide text-zinc-400 uppercase hover:text-white"
            >
              All stories
            </Link>
          </div>

          {featured ? (
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
              <Link
                href={`/news/${featured.slug}`}
                className="rounded-2xl border border-white/12 bg-black p-8 transition-colors hover:border-red-700/40 sm:p-10"
              >
                <p className="text-[0.65rem] tracking-[0.2em] text-red-400 uppercase">
                  {featured.category}
                </p>
                <h3 className="font-heading mt-4 text-4xl leading-[0.92] tracking-wide text-white uppercase sm:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                  {featured.excerpt}
                </p>
              </Link>
              <div className="grid gap-4">
                {moreNews.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="rounded-2xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-red-700/40"
                  >
                    <p className="text-[0.62rem] tracking-[0.18em] text-red-400 uppercase">
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
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
