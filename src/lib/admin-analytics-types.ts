export type MetricValue = {
  value: number | null;
  previous: number | null;
  changePct: number | null;
};

export type SeriesPoint = {
  date: string;
  visitors: number | null;
  sessions: number | null;
  pageViews: number | null;
};

export type PageRow = {
  path: string;
  title: string;
  views: number | null;
  visitors: number | null;
  engagementSeconds: number | null;
};

export type SourceRow = {
  key: string;
  label: string;
  visitors: number | null;
  sessions: number | null;
  pageViews: number | null;
  percent: number | null;
};

export type LocationRow = {
  country: string;
  region: string;
  city: string;
  visitors: number | null;
};

export type DeviceRow = {
  category: string;
  visitors: number | null;
  percent: number | null;
};

export type TechRow = {
  name: string;
  visitors: number | null;
};

export type SearchRow = {
  label: string;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  position: number | null;
};

export type RealtimeSnapshot = {
  available: boolean;
  reason?: string;
  activeUsers: number | null;
  topPages: { path: string; users: number | null }[];
  devices: { category: string; users: number | null }[];
  locations: { label: string; users: number | null }[];
};

export type AnalyticsPayload = {
  status: "ok" | "unconfigured" | "error";
  message?: string;
  timezone: "America/Chicago";
  range: { start: string; end: string; label: string };
  previousRange: { start: string; end: string };
  connections: {
    ga4: boolean;
    gsc: boolean;
    vercelCollector: boolean;
    vercelAnalytics: boolean;
    ga4Reason?: string;
    gscReason?: string;
    vercelReason?: string;
  };
  cards: {
    visitorsToday: MetricValue;
    visitorsYesterday: MetricValue;
    visitorsWeek: MetricValue;
    visitorsMonth: MetricValue;
    pageViews: MetricValue;
    sessions: MetricValue;
    newVisitors: MetricValue;
    returningVisitors: MetricValue;
  };
  series: SeriesPoint[];
  topPages: PageRow[];
  popularContent: { label: string; path: string; views: number | null }[];
  sources: SourceRow[];
  social: SourceRow[];
  search: {
    configured: boolean;
    message?: string;
    totals: {
      clicks: number | null;
      impressions: number | null;
      ctr: number | null;
      position: number | null;
    };
    queries: SearchRow[];
    pages: SearchRow[];
  };
  locations: LocationRow[];
  oklahomaVisitors: number | null;
  devices: DeviceRow[];
  browsers: TechRow[];
  operatingSystems: TechRow[];
  insights: string[];
};

export type RangeKey =
  | "today"
  | "7d"
  | "30d"
  | "90d"
  | "12m"
  | "month"
  | "year"
  | "custom";

export type CompareKey = "auto" | "7d" | "30d" | "month" | "year";
