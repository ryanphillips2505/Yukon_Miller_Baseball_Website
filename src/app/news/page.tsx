import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/lib/news";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const latestPhoto = articles.find((article) => article.image)?.image;

export const metadata: Metadata = {
  title: "News",
  description:
    "Yukon Miller Baseball news, commits, and program updates.",
  openGraph: {
    title: "News",
    description:
      "Yukon Miller Baseball news, commits, and program updates.",
    images: latestPhoto
      ? [
          {
            url: latestPhoto.src,
            width: latestPhoto.width,
            height: latestPhoto.height,
            alt: latestPhoto.alt,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    images: latestPhoto ? [latestPhoto.src] : undefined,
  },
};

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
                  className="block rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-red-700/50 sm:flex sm:items-center sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                      {article.category} · {article.date}
                    </p>
                    <h2 className="font-heading mt-2 text-2xl tracking-wide text-white uppercase">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {article.excerpt}
                    </p>
                  </div>
                  {article.image ? (
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      width={article.image.width}
                      height={article.image.height}
                      className="mt-4 h-36 w-full rounded-xl object-cover object-center sm:mt-0 sm:h-24 sm:w-44 sm:shrink-0"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
