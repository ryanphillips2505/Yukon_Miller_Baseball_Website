import "server-only";

export type VercelVisitTotals = {
  pageviews: number;
  visitors: number;
};

export type VercelVisitRow = {
  date?: string;
  requestPath?: string;
  referrerHostname?: string;
  country?: string;
  deviceType?: string;
  browserName?: string;
  osName?: string;
  pageviews: number;
  visitors: number;
};

function vercelToken() {
  return (
    process.env.VERCEL_TOKEN ||
    process.env.VERCEL_ACCESS_TOKEN ||
    process.env.VERCEL_OIDC_TOKEN ||
    ""
  );
}

function vercelProjectId() {
  return (
    process.env.VERCEL_ANALYTICS_PROJECT_ID ||
    process.env.VERCEL_PROJECT_ID ||
    ""
  );
}

function vercelTeamId() {
  return process.env.VERCEL_ANALYTICS_TEAM_ID || process.env.VERCEL_TEAM_ID || "";
}

export function vercelAnalyticsReady() {
  return Boolean(vercelToken() && vercelProjectId());
}

export function vercelAnalyticsReason() {
  if (vercelAnalyticsReady()) return undefined;
  if (!vercelProjectId()) {
    return "The Vercel project id is missing, so Web Analytics cannot be queried.";
  }
  return "Add VERCEL_TOKEN in Vercel (Account Settings → Tokens) and enable Web Analytics on this project, then redeploy.";
}

function asNumber(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function rowDate(row: Record<string, unknown>) {
  const timestamp = typeof row.timestamp === "string" ? row.timestamp : "";
  const day = typeof row.day === "string" ? row.day : "";
  const date = typeof row.date === "string" ? row.date : "";
  const raw = (date || day || timestamp).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : undefined;
}

function normalizeRow(row: Record<string, unknown>): VercelVisitRow {
  return {
    date: rowDate(row),
    requestPath:
      typeof row.requestPath === "string"
        ? row.requestPath
        : typeof row.route === "string"
          ? row.route
          : undefined,
    referrerHostname:
      typeof row.referrerHostname === "string" ? row.referrerHostname : undefined,
    country: typeof row.country === "string" ? row.country : undefined,
    deviceType: typeof row.deviceType === "string" ? row.deviceType : undefined,
    browserName: typeof row.browserName === "string" ? row.browserName : undefined,
    osName: typeof row.osName === "string" ? row.osName : undefined,
    pageviews: asNumber(row.pageviews),
    visitors: asNumber(row.visitors),
  };
}

async function vercelQuery(path: string, params: Record<string, string | number>) {
  const token = vercelToken();
  const projectId = vercelProjectId();
  if (!token || !projectId) {
    throw new Error(vercelAnalyticsReason() || "Vercel Analytics is not configured.");
  }

  const url = new URL(path, "https://api.vercel.com");
  url.searchParams.set("projectId", projectId);
  const teamId = vercelTeamId();
  if (teamId) url.searchParams.set("teamId", teamId);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const data = (await response.json().catch(() => null)) as
    | {
        data?: unknown;
        error?: { message?: string };
        message?: string;
      }
    | null;

  if (!response.ok) {
    const detail =
      data?.error?.message ||
      data?.message ||
      `Vercel Analytics returned ${response.status}.`;
    throw new Error(detail);
  }
  return data;
}

export async function vercelVisitCount(
  start: string,
  end: string,
): Promise<VercelVisitTotals> {
  const data = await vercelQuery("/v1/query/web-analytics/visits/count", {
    since: start,
    until: end,
  });
  const row =
    data?.data && typeof data.data === "object" && !Array.isArray(data.data)
      ? (data.data as Record<string, unknown>)
      : {};
  return {
    pageviews: asNumber(row.pageviews),
    visitors: asNumber(row.visitors),
  };
}

export async function vercelVisitRows(
  start: string,
  end: string,
  by: string,
  limit = 25,
): Promise<VercelVisitRow[]> {
  const data = await vercelQuery("/v1/query/web-analytics/visits/aggregate", {
    since: start,
    until: end,
    by,
    limit,
  });
  const rows = Array.isArray(data?.data) ? data.data : [];
  return rows
    .filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === "object")
    .map(normalizeRow);
}

export function classifyReferrer(host: string) {
  const s = host.trim().toLowerCase();
  if (!s || s === "(direct)" || s === "direct" || s === "none") return "direct";
  if (s.includes("facebook") || s.includes("fb.com") || s === "fb") return "facebook";
  if (s.includes("instagram") || s.includes("ig.")) return "instagram";
  if (s.includes("twitter") || s.includes("t.co") || s === "x.com" || s.endsWith(".x.com")) {
    return "x";
  }
  if (
    s.includes("google.") ||
    s === "google" ||
    s.includes("bing.") ||
    s.includes("duckduckgo") ||
    s.includes("yahoo.")
  ) {
    return "organic";
  }
  if (
    s.includes("tiktok") ||
    s.includes("linkedin") ||
    s.includes("snapchat") ||
    s.includes("reddit") ||
    s.includes("youtube") ||
    s.includes("threads.net")
  ) {
    return "other-social";
  }
  return "referral";
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  AU: "Australia",
  JP: "Japan",
  KR: "South Korea",
  BR: "Brazil",
  IN: "India",
};

export function countryLabel(code: string) {
  const key = code.trim().toUpperCase();
  return COUNTRY_NAMES[key] || code || "Unknown";
}
