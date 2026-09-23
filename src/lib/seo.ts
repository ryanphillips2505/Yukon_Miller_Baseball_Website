import type { Metadata } from "next";

export const CANONICAL_ORIGIN = "https://www.yukonbaseball.com";

export const sitemapPaths = [
  "/",
  "/news",
  "/roster",
  "/coaches",
  "/schedule",
  "/schedule/instructions",
  "/sponsors",
  "/facilities",
  "/support",
  "/contact",
  "/recruiting",
  "/camps",
  "/alumni",
  "/fans",
  "/records",
  "/media",
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
