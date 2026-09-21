export const pageLabels: Record<string, string> = {
  "/": "Home",
  "/roster": "Roster",
  "/schedule": "Schedule",
  "/schedule/instructions": "Calendar instructions",
  "/news": "News",
  "/coaches": "Coaches",
  "/alumni": "Hall of Honor",
  "/sponsors": "Sponsors",
  "/camps": "Baseball Camps",
  "/contact": "Contact",
  "/facilities": "Facilities",
  "/support": "Home Run Club",
  "/recruiting": "Recruiting",
  "/fans": "Fan info",
  "/records": "Records",
  "/media": "Media",
};

export function normalizePath(value: string) {
  const path = value.split("?")[0]?.trim() || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function labelForPath(path: string) {
  const clean = normalizePath(path);
  if (pageLabels[clean]) return pageLabels[clean];
  if (clean.startsWith("/news/")) return "News story";
  return clean;
}

export function isPublicContentPath(path: string) {
  const clean = normalizePath(path);
  if (clean.startsWith("/admin") || clean.startsWith("/api")) return false;
  return true;
}
