import type { Metadata } from "next";

export const CANONICAL_ORIGIN = "https://www.yukonbaseball.com";

export const sitemapPaths = [
  "/",
  "/news",
  "/news/archive",
  "/roster",
  "/coaches",
  "/schedule",
  "/schedule/instructions",
  "/schedule/history",
  "/sponsors",
  "/facilities",
  "/support",
  "/recruiting",
  "/camps",
  "/alumni",
  "/fans",
  "/records",
] as const;

export function canonicalUrl(path: string) {
  if (path === "/") return `${CANONICAL_ORIGIN}/`;
  return `${CANONICAL_ORIGIN}${path}`;
}

export function publicPageSeo(
  path: string,
): Pick<Metadata, "alternates" | "openGraph"> {
  const url = canonicalUrl(path);
  return {
    alternates: { canonical: url },
    openGraph: { url },
  };
}
