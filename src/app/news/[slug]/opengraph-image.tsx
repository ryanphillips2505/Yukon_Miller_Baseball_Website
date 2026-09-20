import { articles, getArticle } from "@/lib/news";
import { defaultOgImage, ogCoverImage, ogImageSize } from "@/lib/og-cover";

export const alt = "Yukon Miller Baseball news";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  return ogCoverImage(article?.image?.src ?? defaultOgImage);
}
