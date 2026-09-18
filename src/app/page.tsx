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

  return (
    <div>
      <section className="relative -mt-14 overflow-hidden border-b border-white/8 bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(200,16,46,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
        <div className="relative mx-auto w-[min(90vw,52rem)] pt-12 sm:pt-14">
          <div className="relative">
            <div className="pointer-events-none">
              <BrandLogo
                variant="state"
                priority
                sizes="(max-width: 768px) 90vw, 832px"
                className="h-auto w-full opacity-[0.26]"
              />
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/45 to-transparent" />
            </div>
            <div className="absolute inset-x-0 top-[58%] flex flex-col items-center px-4 text-center">
              <p className="text-[0.65rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                OSSAA Class 6A Baseball Program
              </p>
              <h1 className="font-heading mt-2 text-5xl leading-[0.88] text-white uppercase [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
                Home of the Millers
              </h1>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <Link
                  href="/roster"
                  className={cn(buttonVariants(), "h-9 px-5 text-xs uppercase")}
                >
                  Players
                </Link>
                <Link
                  href="/news"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-9 border-white/20 px-5 text-xs uppercase",
                  )}
                >
                  News
                </Link>
              </div>
            </div>
          </div>
          <div className="h-16 sm:h-20" aria-hidden />
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                Players
              </p>
              <h2 className="font-heading mt-1.5 text-4xl tracking-wide text-white uppercase sm:text-5xl">
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

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {commits.map((commit) => (
              <Link
                key={commit.id}
                href={commit.newsSlug ? `/news/${commit.newsSlug}` : "/recruiting"}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-colors hover:border-red-700/40 sm:p-7"
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
                <h3 className="font-heading mt-3 text-3xl leading-none tracking-wide text-white uppercase">
                  {commit.player}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-300">
                  {commit.school}
                </p>
                <p className="mt-1 text-xs tracking-wide text-zinc-500 uppercase">
                  {commit.mascot} · {commit.division}
                </p>
                <div className="mt-auto pt-6">
                  <div className="flex h-20 items-center justify-center rounded-lg bg-[#f4f1ea] p-3">
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
                className="overflow-hidden rounded-2xl border border-white/12 bg-black transition-colors hover:border-red-700/40"
              >
                {featured.image ? (
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    width={featured.image.width}
                    height={featured.image.height}
                    className="h-56 w-full object-cover object-center sm:h-72"
                  />
                ) : null}
                <div className="p-8 sm:p-10">
                  <p className="text-[0.65rem] tracking-[0.2em] text-red-400 uppercase">
                    {featured.category}
                  </p>
                  <h3 className="font-heading mt-4 text-4xl leading-[0.92] tracking-wide text-white uppercase sm:text-5xl">
                    {featured.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                    {featured.excerpt}
                  </p>
                </div>
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
