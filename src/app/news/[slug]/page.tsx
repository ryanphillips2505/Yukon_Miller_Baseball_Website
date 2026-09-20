import { NewsStory } from "@/components/news-story";
import { buttonVariants } from "@/components/ui/button";
import { getArticle, articles } from "@/lib/news";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "News" };
  }

  const image = article.image
    ? {
        url: article.image.src,
        width: article.image.width,
        height: article.image.height,
        alt: article.image.alt,
      }
    : undefined;

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      siteName: "Yukon Miller Baseball",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article
      className={`mx-auto px-4 py-12 sm:px-6 ${
        article.blocks ? "max-w-4xl" : "max-w-3xl"
      }`}
    >
      <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
        {article.category} · {article.date}
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-wide text-white uppercase sm:text-5xl">
        {article.title}
      </h1>
      {article.excerpt ? (
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
          {article.excerpt}
        </p>
      ) : null}
      {article.image ? (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            priority
            className="h-auto w-full"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </figure>
      ) : null}
      {article.blocks ? (
        <NewsStory blocks={article.blocks} />
      ) : (
        <div className="mt-8 space-y-4 text-base leading-7 text-zinc-300">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      <Link
        href="/news"
        className={cn(buttonVariants({ variant: "outline" }), "mt-10 h-10 border-white/15 px-4")}
      >
        Back to news
      </Link>
    </article>
  );
}
