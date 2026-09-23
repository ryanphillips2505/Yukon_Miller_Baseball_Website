import { canonicalUrl, sitemapPaths } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.map((path) => ({
    url: canonicalUrl(path),
  }));
}
