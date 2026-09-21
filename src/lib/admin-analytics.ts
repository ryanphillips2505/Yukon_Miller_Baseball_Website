import "server-only";

import type {
  AnalyticsPayload,
  CompareKey,
  DeviceRow,
  LocationRow,
  MetricValue,
  PageRow,
  RangeKey,
  RealtimeSnapshot,
  SearchRow,
  SeriesPoint,
  SourceRow,
  TechRow,
} from "@/lib/admin-analytics-types";
import {
  isPublicContentPath,
  labelForPath,
  normalizePath,
  pageLabels,
} from "@/lib/admin-pages";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GoogleAuth } from "google-auth-library";

export type {
  AnalyticsPayload,
  CompareKey,
  DeviceRow,
  LocationRow,
  MetricValue,
  PageRow,
  RangeKey,
  RealtimeSnapshot,
  SearchRow,
  SeriesPoint,
  SourceRow,
  TechRow,
} from "@/lib/admin-analytics-types";

const TIMEZONE = "America/Chicago";
const CACHE_MS = 2 * 60 * 1000;
const cache = new Map<string, { at: number; value: AnalyticsPayload }>();

const SOURCE_ORDER = [
  "organic",
  "direct",
  "facebook",
  "instagram",
  "other-social",
  "referral",
  "other",
] as const;

const SOURCE_LABELS: Record<(typeof SOURCE_ORDER)[number], string> = {
  organic: "Google / Organic Search",
  direct: "Direct",
  facebook: "Facebook",
  instagram: "Instagram",
  "other-social": "Other Social",
  referral: "Referral Websites",
  other: "Other",
};

const SOCIAL_KEYS = ["facebook", "instagram", "x", "other-social"] as const;
const SOCIAL_LABELS: Record<(typeof SOCIAL_KEYS)[number], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  "other-social": "Other social networks",
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatYmd(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function addDays(ymd: string, days: number) {
  const [year, month, day] = ymd.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return [
    next.getUTCFullYear(),
    pad(next.getUTCMonth() + 1),
    pad(next.getUTCDate()),
  ].join("-");
}

function diffDays(start: string, end: string) {
  const [ys, ms, ds] = start.split("-").map(Number);
  const [ye, me, de] = end.split("-").map(Number);
  const a = Date.UTC(ys, ms - 1, ds);
  const b = Date.UTC(ye, me - 1, de);
  return Math.round((b - a) / 86_400_000);
}


const RANGE_LABELS: Record<RangeKey, string> = {
  today: "Today",
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "12m": "Last 12 Months",
  month: "This Month",
  year: "This Year",
  custom: "Custom Date Range",
};

export function resolveRange(
  key: RangeKey,
  customStart?: string,
  customEnd?: string,
) {
  const today = formatYmd(new Date());
  if (key === "custom" && customStart && customEnd && customStart <= customEnd) {
    return { start: customStart, end: customEnd, label: RANGE_LABELS.custom };
  }
  if (key === "today") return { start: today, end: today, label: RANGE_LABELS.today };
  if (key === "7d") {
    return { start: addDays(today, -6), end: today, label: RANGE_LABELS["7d"] };
  }
  if (key === "90d") {
    return { start: addDays(today, -89), end: today, label: RANGE_LABELS["90d"] };
  }
  if (key === "12m") {
    return { start: addDays(today, -364), end: today, label: RANGE_LABELS["12m"] };
  }
  if (key === "month") {
    return { start: `${today.slice(0, 8)}01`, end: today, label: RANGE_LABELS.month };
  }
  if (key === "year") {
    return {
      start: `${today.slice(0, 4)}-01-01`,
      end: today,
      label: RANGE_LABELS.year,
    };
  }
  return { start: addDays(today, -29), end: today, label: RANGE_LABELS["30d"] };
}

function previousEquivalent(start: string, end: string) {
  const length = diffDays(start, end) + 1;
  return { start: addDays(start, -length), end: addDays(start, -1) };
}

function compareRange(compare: CompareKey, selected: { start: string; end: string }) {
  const today = formatYmd(new Date());
  if (compare === "7d") {
    const current = { start: addDays(today, -6), end: today };
    return { current, previous: previousEquivalent(current.start, current.end) };
  }
  if (compare === "30d") {
    const current = { start: addDays(today, -29), end: today };
    return { current, previous: previousEquivalent(current.start, current.end) };
  }
  if (compare === "month") {
    const start = `${today.slice(0, 8)}01`;
    const prevEnd = addDays(start, -1);
    const prevStart = `${prevEnd.slice(0, 8)}01`;
    return { current: { start, end: today }, previous: { start: prevStart, end: prevEnd } };
  }
  if (compare === "year") {
    const start = `${today.slice(0, 4)}-01-01`;
    const year = Number(today.slice(0, 4)) - 1;
    return {
      current: { start, end: today },
      previous: { start: `${year}-01-01`, end: `${year}-12-31` },
    };
  }
  return {
    current: selected,
    previous: previousEquivalent(selected.start, selected.end),
  };
}

function changePct(current: number | null, previous: number | null) {
  if (current == null || previous == null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function metric(current: number | null, previous: number | null): MetricValue {
  return { value: current, previous, changePct: changePct(current, previous) };
}

function emptyMetric(): MetricValue {
  return { value: null, previous: null, changePct: null };
}

function parseNumber(value: string | null | undefined) {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function serviceAccount() {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      return JSON.parse(raw) as { client_email?: string; private_key?: string };
    } catch {
      return null;
    }
  }
  const email = process.env.GA_CLIENT_EMAIL;
  const key = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (email && key) return { client_email: email, private_key: key };
  return null;
}

function gaPropertyId() {
  return (process.env.GA_PROPERTY_ID || "").replace(/^properties\//, "").trim();
}

function gscSiteUrl() {
  return (process.env.GSC_SITE_URL || "").trim();
}

function vercelCollectorEnabled() {
  return Boolean(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.VERCEL,
  );
}

function connections() {
  const account = serviceAccount();
  const property = gaPropertyId();
  const site = gscSiteUrl();
  const ga4 = Boolean(account?.client_email && account.private_key && property);
  const gsc = Boolean(account?.client_email && account.private_key && site);
  return {
    ga4,
    gsc,
    vercelCollector: vercelCollectorEnabled(),
    ga4Reason: ga4
      ? undefined
      : "Set GA_PROPERTY_ID and a Google service account (GA_SERVICE_ACCOUNT_JSON or GA_CLIENT_EMAIL + GA_PRIVATE_KEY), then add the service account as a Viewer on the GA4 property.",
    gscReason: gsc
      ? undefined
      : "Set GSC_SITE_URL (example: https://www.yukonbaseball.com/) and add the same service account as a user on that Search Console property.",
    account,
    property,
    site,
  };
}

function gaClient(account: { client_email?: string; private_key?: string }) {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: account.client_email,
      private_key: account.private_key,
    },
  });
}

type GaRow = Record<string, string>;

function rowsFromReport(
  response: {
    rows?:
      | {
          dimensionValues?: { value?: string | null }[] | null;
          metricValues?: { value?: string | null }[] | null;
        }[]
      | null;
  } | null,
  dimensions: string[],
  metrics: string[],
): GaRow[] {
  return (response?.rows ?? []).map((row) => {
    const item: GaRow = {};
    dimensions.forEach((name, index) => {
      item[name] = row.dimensionValues?.[index]?.value ?? "";
    });
    metrics.forEach((name, index) => {
      item[name] = row.metricValues?.[index]?.value ?? "";
    });
    return item;
  });
}

async function runReport(
  client: BetaAnalyticsDataClient,
  property: string,
  options: {
    start: string;
    end: string;
    metrics: string[];
    dimensions?: string[];
    limit?: number;
    orderByMetric?: string;
  },
) {
  const [response] = await client.runReport({
    property: `properties/${property}`,
    dateRanges: [{ startDate: options.start, endDate: options.end }],
    metrics: options.metrics.map((name) => ({ name })),
    dimensions: options.dimensions?.map((name) => ({ name })),
    limit: options.limit,
    orderBys: options.orderByMetric
      ? [{ metric: { metricName: options.orderByMetric }, desc: true }]
      : undefined,
  });
  return rowsFromReport(response, options.dimensions ?? [], options.metrics);
}

function classifySource(channel: string, source: string, medium: string) {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();
  const c = channel.toLowerCase();
  if (s.includes("facebook") || s.includes("fb.com") || s === "fb") return "facebook";
  if (s.includes("instagram") || s.includes("ig.")) return "instagram";
  if (s.includes("twitter") || s === "x" || s.includes("t.co") || s.includes("x.com")) {
    return "x";
  }
  if (c.includes("organic search") || (m === "organic" && !c.includes("social"))) {
    return "organic";
  }
  if (c === "direct" || s === "(direct)") return "direct";
  if (c.includes("social") || m.includes("social")) return "other-social";
  if (c.includes("referral") || m === "referral") return "referral";
  return "other";
}

function sumRows(
  rows: GaRow[],
  classify: (row: GaRow) => string,
  keys: readonly string[],
) {
  const totals = new Map<string, { visitors: number; sessions: number; pageViews: number }>();
  for (const key of keys) totals.set(key, { visitors: 0, sessions: 0, pageViews: 0 });
  for (const row of rows) {
    const key = classify(row);
    const bucket = totals.get(key) ?? { visitors: 0, sessions: 0, pageViews: 0 };
    bucket.visitors += parseNumber(row.activeUsers) ?? 0;
    bucket.sessions += parseNumber(row.sessions) ?? 0;
    bucket.pageViews += parseNumber(row.screenPageViews) ?? 0;
    totals.set(key, bucket);
  }
  const visitorTotal = [...totals.values()].reduce((sum, item) => sum + item.visitors, 0);
  return keys.map((key) => {
    const item = totals.get(key) ?? { visitors: 0, sessions: 0, pageViews: 0 };
    return {
      key,
      visitors: item.visitors,
      sessions: item.sessions,
      pageViews: item.pageViews,
      percent: visitorTotal > 0 ? (item.visitors / visitorTotal) * 100 : null,
    };
  });
}

function emptyPayload(
  status: AnalyticsPayload["status"],
  range: { start: string; end: string; label: string },
  previous: { start: string; end: string },
  message?: string,
): AnalyticsPayload {
  const linked = connections();
  return {
    status,
    message,
    timezone: TIMEZONE,
    range,
    previousRange: previous,
    connections: {
      ga4: linked.ga4,
      gsc: linked.gsc,
      vercelCollector: linked.vercelCollector,
      ga4Reason: linked.ga4Reason,
      gscReason: linked.gscReason,
    },
    cards: {
      visitorsToday: emptyMetric(),
      visitorsYesterday: emptyMetric(),
      visitorsWeek: emptyMetric(),
      visitorsMonth: emptyMetric(),
      pageViews: emptyMetric(),
      sessions: emptyMetric(),
      newVisitors: emptyMetric(),
      returningVisitors: emptyMetric(),
    },
    series: [],
    topPages: [],
    popularContent: [],
    sources: SOURCE_ORDER.map((key) => ({
      key,
      label: SOURCE_LABELS[key],
      visitors: null,
      sessions: null,
      pageViews: null,
      percent: null,
    })),
    social: SOCIAL_KEYS.map((key) => ({
      key,
      label: SOCIAL_LABELS[key],
      visitors: null,
      sessions: null,
      pageViews: null,
      percent: null,
    })),
    search: {
      configured: linked.gsc,
      message: linked.gscReason,
      totals: { clicks: null, impressions: null, ctr: null, position: null },
      queries: [],
      pages: [],
    },
    locations: [],
    oklahomaVisitors: null,
    devices: [],
    browsers: [],
    operatingSystems: [],
    insights: [],
  };
}

async function metricPair(
  client: BetaAnalyticsDataClient,
  property: string,
  start: string,
  end: string,
  prevStart: string,
  prevEnd: string,
  metricName: string,
) {
  const [currentRows, previousRows] = await Promise.all([
    runReport(client, property, {
      start,
      end,
      metrics: [metricName],
    }),
    runReport(client, property, {
      start: prevStart,
      end: prevEnd,
      metrics: [metricName],
    }),
  ]);
  return metric(
    parseNumber(currentRows[0]?.[metricName]),
    parseNumber(previousRows[0]?.[metricName]),
  );
}

async function fetchSearchConsole(
  account: { client_email?: string; private_key?: string },
  site: string,
  start: string,
  end: string,
) {
  const auth = new GoogleAuth({
    credentials: {
      client_email: account.client_email,
      private_key: account.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) {
    throw new Error("Search Console token unavailable.");
  }

  async function query(dimension?: "query" | "page") {
    const response = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
          dimensions: dimension ? [dimension] : undefined,
          rowLimit: dimension ? 10 : 1,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Search Console ${response.status}`);
    }
    const data = (await response.json()) as {
      rows?: {
        keys?: string[];
        clicks?: number;
        impressions?: number;
        ctr?: number;
        position?: number;
      }[];
    };
    return data.rows ?? [];
  }

  const [totals, queries, pages] = await Promise.all([
    query(),
    query("query"),
    query("page"),
  ]);

  const total = totals[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  const mapRows = (rows: Awaited<ReturnType<typeof query>>): SearchRow[] =>
    rows.slice(0, 10).map((row) => ({
      label: row.keys?.[0] || "",
      clicks: row.clicks ?? null,
      impressions: row.impressions ?? null,
      ctr: row.ctr ?? null,
      position: row.position ?? null,
    }));

  return {
    totals: {
      clicks: total.clicks ?? null,
      impressions: total.impressions ?? null,
      ctr: total.ctr ?? (total.impressions ? total.clicks! / total.impressions : null),
      position: total.position ?? null,
    },
    queries: mapRows(queries),
    pages: mapRows(pages),
  };
}

function buildInsights(payload: AnalyticsPayload) {
  const lines: string[] = [];
  const month = payload.cards.visitorsMonth;
  if (month.value != null && month.changePct != null) {
    const direction = month.changePct >= 0 ? "up" : "down";
    lines.push(
      `Website traffic is ${direction} ${Math.abs(month.changePct).toFixed(1)}% compared with the previous 30 days.`,
    );
  }
  const top = payload.popularContent[0];
  if (top?.views != null) {
    lines.push(`${top.label} was the most visited page in this date range.`);
  }
  const mobile = payload.devices.find((item) => item.category.toLowerCase() === "mobile");
  if (mobile?.percent != null) {
    lines.push(
      `${mobile.percent.toFixed(0)}% of visitors accessed the website from mobile devices.`,
    );
  }
  const facebook = payload.social.find((item) => item.key === "facebook");
  if (facebook?.visitors != null) {
    lines.push(`Facebook generated ${facebook.visitors} visits in this date range.`);
  }
  const oklahoma = payload.oklahomaVisitors;
  if (oklahoma != null && payload.cards.pageViews.value != null) {
    lines.push(`${oklahoma} visits came from Oklahoma in this date range.`);
  }
  return lines;
}

export async function loadAnalytics(options: {
  range: RangeKey;
  compare: CompareKey;
  start?: string;
  end?: string;
}): Promise<AnalyticsPayload> {
  const selected = resolveRange(options.range, options.start, options.end);
  const compared = compareRange(options.compare, selected);
  const key = JSON.stringify({
    range: selected,
    compare: compared,
  });
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;

  const linked = connections();
  if (!linked.ga4 || !linked.account || !linked.property) {
    const payload = emptyPayload(
      "unconfigured",
      selected,
      compared.previous,
      linked.ga4Reason,
    );
    cache.set(key, { at: Date.now(), value: payload });
    return payload;
  }

  try {
    const client = gaClient(linked.account);
    const property = linked.property;
    const today = formatYmd(new Date());
    const yesterday = addDays(today, -1);
    const weekStart = addDays(today, -6);
    const monthStart = addDays(today, -29);

    const [
      visitorsToday,
      visitorsYesterday,
      visitorsWeek,
      visitorsMonth,
      pageViews,
      sessions,
      newVisitors,
      returningRows,
      returningPrev,
      seriesRows,
      pageRows,
      sourceRows,
      locationRows,
      deviceRows,
      browserRows,
      osRows,
    ] = await Promise.all([
      metricPair(client, property, today, today, yesterday, yesterday, "activeUsers"),
      metricPair(
        client,
        property,
        yesterday,
        yesterday,
        addDays(yesterday, -1),
        addDays(yesterday, -1),
        "activeUsers",
      ),
      metricPair(
        client,
        property,
        weekStart,
        today,
        addDays(weekStart, -7),
        addDays(today, -7),
        "activeUsers",
      ),
      metricPair(
        client,
        property,
        monthStart,
        today,
        addDays(monthStart, -30),
        addDays(today, -30),
        "activeUsers",
      ),
      metricPair(
        client,
        property,
        compared.current.start,
        compared.current.end,
        compared.previous.start,
        compared.previous.end,
        "screenPageViews",
      ),
      metricPair(
        client,
        property,
        compared.current.start,
        compared.current.end,
        compared.previous.start,
        compared.previous.end,
        "sessions",
      ),
      metricPair(
        client,
        property,
        compared.current.start,
        compared.current.end,
        compared.previous.start,
        compared.previous.end,
        "newUsers",
      ),
      runReport(client, property, {
        start: compared.current.start,
        end: compared.current.end,
        metrics: ["activeUsers"],
        dimensions: ["newVsReturning"],
      }),
      runReport(client, property, {
        start: compared.previous.start,
        end: compared.previous.end,
        metrics: ["activeUsers"],
        dimensions: ["newVsReturning"],
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers", "sessions", "screenPageViews"],
        dimensions: ["date"],
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["screenPageViews", "activeUsers", "averageSessionDuration"],
        dimensions: ["pagePath", "pageTitle"],
        orderByMetric: "screenPageViews",
        limit: 25,
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers", "sessions", "screenPageViews"],
        dimensions: ["sessionDefaultChannelGroup", "sessionSource", "sessionMedium"],
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers"],
        dimensions: ["country", "region", "city"],
        orderByMetric: "activeUsers",
        limit: 25,
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers"],
        dimensions: ["deviceCategory"],
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers"],
        dimensions: ["browser"],
        orderByMetric: "activeUsers",
        limit: 8,
      }),
      runReport(client, property, {
        start: selected.start,
        end: selected.end,
        metrics: ["activeUsers"],
        dimensions: ["operatingSystem"],
        orderByMetric: "activeUsers",
        limit: 8,
      }),
    ]);

    const returningNow = returningRows.find((row) =>
      row.newVsReturning?.toLowerCase().includes("return"),
    );
    const returningBefore = returningPrev.find((row) =>
      row.newVsReturning?.toLowerCase().includes("return"),
    );

    const series = seriesRows
      .map((row) => {
        const raw = row.date || "";
        const date =
          raw.length === 8
            ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
            : raw;
        return {
          date,
          visitors: parseNumber(row.activeUsers),
          sessions: parseNumber(row.sessions),
          pageViews: parseNumber(row.screenPageViews),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    const topPages: PageRow[] = pageRows
      .map((row) => {
        const path = normalizePath(row.pagePath || "/");
        return {
          path,
          title: row.pageTitle || labelForPath(path),
          views: parseNumber(row.screenPageViews),
          visitors: parseNumber(row.activeUsers),
          engagementSeconds: parseNumber(row.averageSessionDuration),
        };
      })
      .filter((row) => isPublicContentPath(row.path));

    const grouped = new Map<string, number>();
    for (const page of topPages) {
      const root = page.path === "/" ? "/" : `/${page.path.split("/")[1]}`;
      const label = labelForPath(root);
      grouped.set(label, (grouped.get(label) ?? 0) + (page.views ?? 0));
    }
    const popularContent = [...grouped.entries()]
      .map(([label, views]) => ({
        label,
        path: Object.keys(pageLabels).find((path) => pageLabels[path] === label) || "/",
        views,
      }))
      .sort((a, b) => (b.views ?? 0) - (a.views ?? 0));

    const classified = sumRows(
      sourceRows,
      (row) =>
        classifySource(
          row.sessionDefaultChannelGroup || "",
          row.sessionSource || "",
          row.sessionMedium || "",
        ),
      SOURCE_ORDER,
    );
    const sources: SourceRow[] = classified.map((item) => ({
      ...item,
      label: SOURCE_LABELS[item.key as (typeof SOURCE_ORDER)[number]] ?? item.key,
    }));

    const socialClassified = sumRows(
      sourceRows,
      (row) => {
        const key = classifySource(
          row.sessionDefaultChannelGroup || "",
          row.sessionSource || "",
          row.sessionMedium || "",
        );
        if (key === "facebook" || key === "instagram" || key === "x") return key;
        if (key === "other-social") return "other-social";
        return "";
      },
      SOCIAL_KEYS,
    );
    const social: SourceRow[] = socialClassified.map((item) => ({
      ...item,
      label: SOCIAL_LABELS[item.key as (typeof SOCIAL_KEYS)[number]] ?? item.key,
    }));

    const locations: LocationRow[] = locationRows.map((row) => ({
      country: row.country || "Unknown",
      region: row.region || "Unknown",
      city: row.city || "Unknown",
      visitors: parseNumber(row.activeUsers),
    }));
    const oklahomaVisitors = locations
      .filter((row) => /oklahoma/i.test(row.region) || /oklahoma/i.test(row.city))
      .reduce((sum, row) => sum + (row.visitors ?? 0), 0);

    const deviceTotal = deviceRows.reduce(
      (sum, row) => sum + (parseNumber(row.activeUsers) ?? 0),
      0,
    );
    const devices: DeviceRow[] = ["mobile", "desktop", "tablet"].map((category) => {
      const row = deviceRows.find(
        (item) => item.deviceCategory?.toLowerCase() === category,
      );
      const visitors = parseNumber(row?.activeUsers) ?? 0;
      return {
        category: category[0].toUpperCase() + category.slice(1),
        visitors,
        percent: deviceTotal > 0 ? (visitors / deviceTotal) * 100 : null,
      };
    });

    const browsers: TechRow[] = browserRows.map((row) => ({
      name: row.browser || "Unknown",
      visitors: parseNumber(row.activeUsers),
    }));
    const operatingSystems: TechRow[] = osRows.map((row) => ({
      name: row.operatingSystem || "Unknown",
      visitors: parseNumber(row.activeUsers),
    }));

    let search: AnalyticsPayload["search"] = {
      configured: linked.gsc,
      message: linked.gscReason,
      totals: { clicks: null, impressions: null, ctr: null, position: null },
      queries: [],
      pages: [],
    };
    if (linked.gsc && linked.account && linked.site) {
      try {
        const gsc = await fetchSearchConsole(
          linked.account,
          linked.site,
          selected.start,
          selected.end,
        );
        search = { configured: true, totals: gsc.totals, queries: gsc.queries, pages: gsc.pages };
      } catch (error) {
        search = {
          configured: false,
          message:
            error instanceof Error
              ? `Search Console is not returning data yet. ${linked.gscReason}`
              : linked.gscReason,
          totals: { clicks: null, impressions: null, ctr: null, position: null },
          queries: [],
          pages: [],
        };
      }
    }

    const payload: AnalyticsPayload = {
      status: "ok",
      timezone: TIMEZONE,
      range: selected,
      previousRange: compared.previous,
      connections: {
        ga4: true,
        gsc: search.configured,
        vercelCollector: linked.vercelCollector,
        gscReason: search.configured ? undefined : search.message,
      },
      cards: {
        visitorsToday,
        visitorsYesterday,
        visitorsWeek,
        visitorsMonth,
        pageViews,
        sessions,
        newVisitors,
        returningVisitors: metric(
          parseNumber(returningNow?.activeUsers),
          parseNumber(returningBefore?.activeUsers),
        ),
      },
      series,
      topPages,
      popularContent,
      sources,
      social,
      search,
      locations,
      oklahomaVisitors,
      devices,
      browsers,
      operatingSystems,
      insights: [],
    };
    payload.insights = buildInsights(payload);
    cache.set(key, { at: Date.now(), value: payload });
    return payload;
  } catch (error) {
    return emptyPayload(
      "error",
      selected,
      compared.previous,
      error instanceof Error
        ? error.message
        : "Google Analytics could not be read.",
    );
  }
}

export async function loadRealtime(): Promise<RealtimeSnapshot> {
  const linked = connections();
  if (!linked.ga4 || !linked.account || !linked.property) {
    return {
      available: false,
      reason:
        "Real-time traffic requires the same GA4 service account and property used for reports.",
      activeUsers: null,
      topPages: [],
      devices: [],
      locations: [],
    };
  }

  try {
    const client = gaClient(linked.account);
    const [response] = await client.runRealtimeReport({
      property: `properties/${linked.property}`,
      metrics: [{ name: "activeUsers" }],
      dimensions: [
        { name: "unifiedScreenName" },
        { name: "deviceCategory" },
        { name: "country" },
        { name: "city" },
      ],
    });
    const rows = rowsFromReport(
      response,
      ["unifiedScreenName", "deviceCategory", "country", "city"],
      ["activeUsers"],
    );
    const activeUsers = rows.reduce(
      (sum, row) => sum + (parseNumber(row.activeUsers) ?? 0),
      0,
    );
    const pages = new Map<string, number>();
    const devices = new Map<string, number>();
    const locations = new Map<string, number>();
    for (const row of rows) {
      const users = parseNumber(row.activeUsers) ?? 0;
      const page = row.unifiedScreenName || "Unknown";
      pages.set(page, (pages.get(page) ?? 0) + users);
      const device = row.deviceCategory || "Unknown";
      devices.set(device, (devices.get(device) ?? 0) + users);
      const location = [row.city, row.country].filter(Boolean).join(", ") || "Unknown";
      locations.set(location, (locations.get(location) ?? 0) + users);
    }
    const sortMap = (map: Map<string, number>) =>
      [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([label, users]) => ({ label, users }));

    return {
      available: true,
      activeUsers,
      topPages: sortMap(pages).map((item) => ({ path: item.label, users: item.users })),
      devices: sortMap(devices).map((item) => ({
        category: item.label,
        users: item.users,
      })),
      locations: sortMap(locations),
    };
  } catch (error) {
    return {
      available: false,
      reason:
        error instanceof Error
          ? error.message
          : "GA4 real-time data is not available.",
      activeUsers: null,
      topPages: [],
      devices: [],
      locations: [],
    };
  }
}

export function analyticsToCsv(payload: AnalyticsPayload) {
  const lines = [
    ["Section", "Label", "Value", "Previous", "Change %"].join(","),
  ];
  const push = (
    section: string,
    label: string,
    value: number | null,
    previous: number | null = null,
    change: number | null = null,
  ) => {
    lines.push(
      [section, label, value ?? "", previous ?? "", change ?? ""]
        .map((item) => `"${String(item).replaceAll('"', '""')}"`)
        .join(","),
    );
  };

  (
    [
      ["Visitors Today", payload.cards.visitorsToday],
      ["Visitors Yesterday", payload.cards.visitorsYesterday],
      ["Visitors This Week", payload.cards.visitorsWeek],
      ["Visitors This Month", payload.cards.visitorsMonth],
      ["Page Views", payload.cards.pageViews],
      ["Sessions", payload.cards.sessions],
      ["New Visitors", payload.cards.newVisitors],
      ["Returning Visitors", payload.cards.returningVisitors],
    ] as const
  ).forEach(([label, item]) =>
    push("Overview", label, item.value, item.previous, item.changePct),
  );
  payload.topPages.forEach((page) =>
    push("Top Pages", page.path, page.views, page.visitors),
  );
  payload.sources.forEach((source) =>
    push("Sources", source.label, source.visitors, source.sessions, source.percent),
  );
  payload.social.forEach((source) =>
    push("Social", source.label, source.visitors, source.sessions),
  );
  payload.locations.forEach((row) =>
    push("Location", `${row.city}, ${row.region}, ${row.country}`, row.visitors),
  );
  payload.devices.forEach((row) =>
    push("Devices", row.category, row.visitors, null, row.percent),
  );
  return lines.join("\n");
}
