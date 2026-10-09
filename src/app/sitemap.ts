import { historicalSeasons } from "@/lib/history/seasons";
import { articles } from "@/lib/news";
import { canonicalUrl, sitemapPaths } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...sitemapPaths.map((path) => ({
      url: canonicalUrl(path),
    })),
    ...historicalSeasons.map((season) => ({
      url: canonicalUrl(`/schedule/history/${season.year}`),
    })),
    ...articles.map((article) => ({
      url: canonicalUrl(`/news/${article.slug}`),
    })),
  ];
}
