import { buttonVariants } from "@/components/ui/button";
import { getArticle, articles } from "@/lib/news";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
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
  return { title: article?.title ?? "News" };
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
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
        {article.category} · {article.date}
      </p>
      <h1 className="font-heading mt-3 text-4xl tracking-wide text-white uppercase">
        {article.title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-7 text-zinc-300">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link
        href="/news"
        className={cn(buttonVariants({ variant: "outline" }), "mt-10 h-10 border-white/15 px-4")}
      >
        Back to news
      </Link>
    </article>
  );
}
