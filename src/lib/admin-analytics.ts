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
  SeriesPoint,
  SourceRow,
} from "@/lib/admin-analytics-types";
import {
  isPublicContentPath,
  labelForPath,
  normalizePath,
  pageLabels,
} from "@/lib/admin-pages";
import {
  classifyReferrer,
  countryLabel,
  vercelAnalyticsReady,
  vercelAnalyticsReason,
  vercelVisitCount,
  vercelVisitRows,
} from "@/lib/admin-vercel-analytics";

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

const SEARCH_UNAVAILABLE =
  "Search queries are not available from Vercel Web Analytics.";
const LIVE_UNAVAILABLE =
  "Live traffic is not available from Vercel Web Analytics.";
const VERCEL_NOTE =
  "Numbers are from Vercel Web Analytics. Sessions, new/returning visitors, live traffic, and city/state are not provided by this source.";
const UNCONFIGURED_MESSAGE =
  "Enable Web Analytics on this Vercel project, add VERCEL_TOKEN if the dashboard cannot read numbers, redeploy, then visit public pages so traffic can be counted.";

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

function connections() {
  const vercelAnalytics = vercelAnalyticsReady();
  return {
    ga4: false,
    gsc: false,
    vercelCollector: Boolean(process.env.VERCEL),
    vercelAnalytics,
    vercelReason: vercelAnalytics ? undefined : vercelAnalyticsReason(),
    gscReason: SEARCH_UNAVAILABLE,
  };
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
      ga4: false,
      gsc: false,
      vercelCollector: linked.vercelCollector,
      vercelAnalytics: linked.vercelAnalytics,
      gscReason: SEARCH_UNAVAILABLE,
      vercelReason: linked.vercelReason,
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
      configured: false,
      message: SEARCH_UNAVAILABLE,
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
  if (facebook?.visitors != null && facebook.visitors > 0) {
    lines.push(`Facebook generated ${facebook.visitors} visits in this date range.`);
  }
  return lines;
}

function fillSeries(
  start: string,
  end: string,
  rows: { date?: string; visitors: number; pageviews: number }[],
): SeriesPoint[] {
  const byDate = new Map(
    rows.filter((row) => row.date).map((row) => [row.date as string, row]),
  );
  const series: SeriesPoint[] = [];
  for (let cursor = start; cursor <= end; cursor = addDays(cursor, 1)) {
    const row = byDate.get(cursor);
    series.push({
      date: cursor,
      visitors: row?.visitors ?? 0,
      sessions: null,
      pageViews: row?.pageviews ?? 0,
    });
  }
  return series;
}

async function loadFromVercel(
  selected: { start: string; end: string; label: string },
  compared: {
    current: { start: string; end: string };
    previous: { start: string; end: string };
  },
): Promise<AnalyticsPayload> {
  const linked = connections();
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
    previousPageViews,
    seriesRows,
    pageRows,
    referrerRows,
    locationRows,
    deviceRows,
    browserRows,
    osRows,
  ] = await Promise.all([
    vercelVisitCount(today, today),
    vercelVisitCount(yesterday, yesterday),
    vercelVisitCount(weekStart, today),
    vercelVisitCount(monthStart, today),
    vercelVisitCount(compared.current.start, compared.current.end),
    vercelVisitCount(compared.previous.start, compared.previous.end),
    vercelVisitRows(selected.start, selected.end, "day", 100),
    vercelVisitRows(selected.start, selected.end, "requestPath", 25),
    vercelVisitRows(selected.start, selected.end, "referrerHostname", 40),
    vercelVisitRows(selected.start, selected.end, "country", 25),
    vercelVisitRows(selected.start, selected.end, "deviceType", 10),
    vercelVisitRows(selected.start, selected.end, "browserName", 8),
    vercelVisitRows(selected.start, selected.end, "osName", 8),
  ]);

  const [prevToday, prevYesterday, prevWeek, prevMonth] = await Promise.all([
    vercelVisitCount(yesterday, yesterday),
    vercelVisitCount(addDays(yesterday, -1), addDays(yesterday, -1)),
    vercelVisitCount(addDays(weekStart, -7), addDays(today, -7)),
    vercelVisitCount(addDays(monthStart, -30), addDays(today, -30)),
  ]);

  const topPages: PageRow[] = pageRows
    .map((row) => {
      const path = normalizePath(row.requestPath || "/");
      return {
        path,
        title: labelForPath(path),
        views: row.pageviews,
        visitors: row.visitors,
        engagementSeconds: null,
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

  const sourceTotals = new Map<
    string,
    { visitors: number; sessions: number; pageViews: number }
  >();
  for (const key of SOURCE_ORDER) {
    sourceTotals.set(key, { visitors: 0, sessions: 0, pageViews: 0 });
  }
  for (const row of referrerRows) {
    const key = classifyReferrer(row.referrerHostname || "");
    const bucket = sourceTotals.get(key) ?? {
      visitors: 0,
      sessions: 0,
      pageViews: 0,
    };
    bucket.visitors += row.visitors;
    bucket.pageViews += row.pageviews;
    sourceTotals.set(key, bucket);
  }
  const visitorTotal = [...sourceTotals.values()].reduce(
    (sum, item) => sum + item.visitors,
    0,
  );
  const sources: SourceRow[] = SOURCE_ORDER.map((key) => {
    const item = sourceTotals.get(key) ?? {
      visitors: 0,
      sessions: 0,
      pageViews: 0,
    };
    return {
      key,
      label: SOURCE_LABELS[key],
      visitors: item.visitors,
      sessions: null,
      pageViews: item.pageViews,
      percent: visitorTotal > 0 ? (item.visitors / visitorTotal) * 100 : null,
    };
  });
  const social: SourceRow[] = SOCIAL_KEYS.map((key) => {
    const item = sourceTotals.get(key) ?? {
      visitors: 0,
      sessions: 0,
      pageViews: 0,
    };
    return {
      key,
      label: SOCIAL_LABELS[key],
      visitors: item.visitors,
      sessions: null,
      pageViews: item.pageViews,
      percent: visitorTotal > 0 ? (item.visitors / visitorTotal) * 100 : null,
    };
  });

  const locations: LocationRow[] = locationRows.map((row) => ({
    country: countryLabel(row.country || ""),
    region: "",
    city: "",
    visitors: row.visitors,
  }));

  const deviceTotal = deviceRows.reduce((sum, row) => sum + row.visitors, 0);
  const devices: DeviceRow[] = ["mobile", "desktop", "tablet"].map((category) => {
    const row = deviceRows.find(
      (item) => item.deviceType?.toLowerCase() === category,
    );
    const visitors = row?.visitors ?? 0;
    return {
      category: category[0].toUpperCase() + category.slice(1),
      visitors,
      percent: deviceTotal > 0 ? (visitors / deviceTotal) * 100 : null,
    };
  });

  const payload: AnalyticsPayload = {
    status: "ok",
    message: VERCEL_NOTE,
    timezone: TIMEZONE,
    range: selected,
    previousRange: compared.previous,
    connections: {
      ga4: false,
      gsc: false,
      vercelCollector: linked.vercelCollector,
      vercelAnalytics: true,
      gscReason: SEARCH_UNAVAILABLE,
    },
    cards: {
      visitorsToday: metric(visitorsToday.visitors, prevToday.visitors),
      visitorsYesterday: metric(visitorsYesterday.visitors, prevYesterday.visitors),
      visitorsWeek: metric(visitorsWeek.visitors, prevWeek.visitors),
      visitorsMonth: metric(visitorsMonth.visitors, prevMonth.visitors),
      pageViews: metric(pageViews.pageviews, previousPageViews.pageviews),
      sessions: emptyMetric(),
      newVisitors: emptyMetric(),
      returningVisitors: emptyMetric(),
    },
    series: fillSeries(selected.start, selected.end, seriesRows),
    topPages,
    popularContent,
    sources,
    social,
    search: {
      configured: false,
      message: SEARCH_UNAVAILABLE,
      totals: { clicks: null, impressions: null, ctr: null, position: null },
      queries: [],
      pages: [],
    },
    locations,
    oklahomaVisitors: null,
    devices,
    browsers: browserRows.map((row) => ({
      name: row.browserName || "Unknown",
      visitors: row.visitors,
    })),
    operatingSystems: osRows.map((row) => ({
      name: row.osName || "Unknown",
      visitors: row.visitors,
    })),
    insights: [],
  };
  payload.insights = buildInsights(payload);
  return payload;
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

  if (!vercelAnalyticsReady()) {
    const payload = emptyPayload(
      "unconfigured",
      selected,
      compared.previous,
      UNCONFIGURED_MESSAGE,
    );
    cache.set(key, { at: Date.now(), value: payload });
    return payload;
  }

  try {
    const payload = await loadFromVercel(selected, compared);
    cache.set(key, { at: Date.now(), value: payload });
    return payload;
  } catch (error) {
    const payload = emptyPayload(
      "error",
      selected,
      compared.previous,
      error instanceof Error
        ? `${UNCONFIGURED_MESSAGE} ${error.message}`
        : UNCONFIGURED_MESSAGE,
    );
    cache.set(key, { at: Date.now(), value: payload });
    return payload;
  }
}

export async function loadRealtime(): Promise<RealtimeSnapshot> {
  return {
    available: false,
    reason: LIVE_UNAVAILABLE,
    activeUsers: null,
    topPages: [],
    devices: [],
    locations: [],
  };
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
    push(
      "Location",
      [row.city, row.region, row.country].filter(Boolean).join(", "),
      row.visitors,
    ),
  );
  payload.devices.forEach((row) =>
    push("Devices", row.category, row.visitors, null, row.percent),
  );
  return lines.join("\n");
}
