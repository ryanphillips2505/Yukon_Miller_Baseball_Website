"use client";

import { BrandLogo } from "@/components/brand-logo";
import { CommandChart } from "@/components/command-chart";
import { buttonVariants } from "@/components/ui/button";
import type {
  AnalyticsPayload,
  MetricValue,
  PageRow,
  RealtimeSnapshot,
} from "@/lib/admin-analytics-types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SeriesKey = "visitors" | "sessions" | "pageViews";

const rangeOptions = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "12m", label: "Last 12 Months" },
  { id: "custom", label: "Custom" },
] as const;

const compareOptions = [
  { id: "auto", label: "vs previous period" },
  { id: "7d", label: "Last 7 vs previous 7" },
  { id: "30d", label: "Last 30 vs previous 30" },
  { id: "month", label: "This month vs last month" },
  { id: "year", label: "This year vs last year" },
] as const;

function formatNumber(value: number | null) {
  if (value == null) return "Data unavailable";
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function formatPct(value: number | null) {
  if (value == null) return null;
  const sign = value > 0 ? "↑" : value < 0 ? "↓" : "→";
  return `${sign} ${Math.abs(value).toFixed(1)}%`;
}

function formatSeconds(value: number | null) {
  if (value == null) return "Data unavailable";
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function Card({
  label,
  metric,
  compareLabel,
}: {
  label: string;
  metric: MetricValue;
  compareLabel: string;
}) {
  const change = formatPct(metric.changePct);
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-5">
      <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
        {label}
      </p>
      <p className="font-heading mt-2 text-3xl tracking-wide text-white">
        {formatNumber(metric.value)}
      </p>
      {change && metric.value != null ? (
        <p
          className={`mt-2 text-xs ${
            (metric.changePct ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {change} {compareLabel}
        </p>
      ) : null}
    </article>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
      <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function CommandDashboard() {
  const router = useRouter();
  const [range, setRange] = useState<(typeof rangeOptions)[number]["id"]>("30d");
  const [compare, setCompare] =
    useState<(typeof compareOptions)[number]["id"]>("auto");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [seriesKeys, setSeriesKeys] = useState<SeriesKey[]>([
    "visitors",
    "pageViews",
  ]);
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [live, setLive] = useState<RealtimeSnapshot | null>(null);
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageRow | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({ range, compare });
    if (range === "custom" && customStart && customEnd) {
      params.set("start", customStart);
      params.set("end", customEnd);
    }
    return params.toString();
  }, [range, compare, customStart, customEnd]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setError("");
      try {
        const response = await fetch(`/api/admin/analytics?${query}`);
        if (response.status === 401) {
          router.push("/admin");
          return;
        }
        const payload = (await response.json()) as AnalyticsPayload;
        if (!cancelled) setData(payload);
      } catch {
        if (!cancelled) setError("Could not load analytics.");
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [query, router]);

  useEffect(() => {
    let cancelled = false;
    async function loadLive() {
      try {
        const response = await fetch("/api/admin/analytics/realtime");
        if (!response.ok) return;
        const payload = (await response.json()) as RealtimeSnapshot;
        if (!cancelled) setLive(payload);
      } catch {
        // Keep the last snapshot. Missing live data is shown as unavailable.
      }
    }
    void loadLive();
    const timer = window.setInterval(loadLive, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  function toggleSeries(key: SeriesKey) {
    setSeriesKeys((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  async function signOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  const compareLabel =
    compareOptions.find((item) => item.id === compare)?.label ??
    "vs previous period";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 print:max-w-none">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo variant="mark" className="size-12 rounded-sm" sizes="48px" />
          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
              Yukon Baseball
            </p>
            <h1 className="font-heading text-4xl tracking-wide text-white uppercase sm:text-5xl">
              Command Center
            </h1>
            <p className="mt-1 text-sm text-zinc-400">Website Analytics</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <a
            href={`/api/admin/analytics/export?${query}`}
            className={cn(buttonVariants({ variant: "outline" }), "h-9 uppercase")}
          >
            Export CSV
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className={cn(buttonVariants({ variant: "outline" }), "h-9 uppercase")}
          >
            Print summary
          </button>
          <button
            type="button"
            onClick={signOut}
            className={cn(buttonVariants(), "h-9 uppercase")}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mt-5 flex flex-col gap-3 print:hidden">
        <div className="flex flex-wrap gap-2">
          {rangeOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRange(item.id)}
              className={`rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase ${
                range === item.id
                  ? "border-red-500 bg-red-600/20 text-white"
                  : "border-white/10 text-zinc-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {range === "custom" ? (
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              value={customStart}
              onChange={(event) => setCustomStart(event.target.value)}
              className="h-9 rounded-lg border border-white/15 bg-black px-3 text-sm"
            />
            <input
              type="date"
              value={customEnd}
              onChange={(event) => setCustomEnd(event.target.value)}
              className="h-9 rounded-lg border border-white/15 bg-black px-3 text-sm"
            />
          </div>
        ) : null}
        <select
          value={compare}
          onChange={(event) =>
            setCompare(event.target.value as (typeof compareOptions)[number]["id"])
          }
          className="h-9 max-w-sm rounded-lg border border-white/15 bg-black px-3 text-sm"
        >
          {compareOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      {data?.status === "unconfigured" || data?.status === "error" ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950 p-4 text-sm leading-6 text-zinc-300">
          <p className="font-medium text-white">Traffic is not connected yet.</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-zinc-400">
            <li>In Vercel, open this project → Analytics → Enable Web Analytics.</li>
            <li>
              Add <span className="text-zinc-200">VERCEL_TOKEN</span> (Account
              Settings → Tokens) for Production, then Redeploy.
            </li>
            <li>Visit public pages on yukonbaseball.com so new traffic can be counted.</li>
          </ol>
          {data.message ? (
            <p className="mt-3 text-xs leading-5 text-zinc-500">{data.message}</p>
          ) : null}
        </div>
      ) : null}
      {data?.status === "ok" && !data.connections.ga4 ? (
        <p className="mt-4 text-sm text-zinc-500">
          {data.message ||
            "Numbers are from Vercel Web Analytics. Sessions, new/returning visitors, and live traffic need Google Analytics 4."}
        </p>
      ) : null}

      {data ? (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Card label="Visitors Today" metric={data.cards.visitorsToday} compareLabel="vs yesterday" />
            <Card label="Visitors Yesterday" metric={data.cards.visitorsYesterday} compareLabel="vs the day before" />
            <Card label="Visitors This Week" metric={data.cards.visitorsWeek} compareLabel="vs previous 7 days" />
            <Card label="Visitors This Month" metric={data.cards.visitorsMonth} compareLabel="vs previous 30 days" />
            <Card label="Page Views" metric={data.cards.pageViews} compareLabel={compareLabel} />
            <Card label="Sessions" metric={data.cards.sessions} compareLabel={compareLabel} />
            <Card label="New Visitors" metric={data.cards.newVisitors} compareLabel={compareLabel} />
            <Card label="Returning Visitors" metric={data.cards.returningVisitors} compareLabel={compareLabel} />
          </div>

          <Panel title="Traffic">
            <p className="mb-3 text-xs text-zinc-500">
              {data.range.label}: {data.range.start} to {data.range.end}
            </p>
            <CommandChart
              series={data.series}
              active={seriesKeys}
              onToggle={toggleSeries}
            />
          </Panel>

          <Panel title="Live Traffic">
            {live?.available ? (
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Active users
                  </p>
                  <p className="font-heading mt-1 text-4xl text-white">
                    {formatNumber(live.activeUsers)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Current top pages
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                    {live.topPages.length === 0 ? (
                      <li>Data unavailable</li>
                    ) : (
                      live.topPages.map((page) => (
                        <li key={page.path}>
                          {page.path} · {formatNumber(page.users)}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
                    Devices / location
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                    {live.devices.map((item) => (
                      <li key={item.category}>
                        {item.category} · {formatNumber(item.users)}
                      </li>
                    ))}
                    {live.locations.slice(0, 3).map((item) => (
                      <li key={item.label}>
                        {item.label} · {formatNumber(item.users)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-zinc-500">
                    GA4 real-time reports do not include traffic source.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                {live?.reason || "Data unavailable"}
              </p>
            )}
          </Panel>

          <Panel title="Top Pages">
            {data.topPages.length === 0 ? (
              <p className="text-sm text-zinc-500">Data unavailable</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
                    <tr>
                      <th className="pb-2 font-medium">Page</th>
                      <th className="pb-2 font-medium">Views</th>
                      <th className="pb-2 font-medium">Visitors</th>
                      <th className="pb-2 font-medium">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((page) => (
                      <tr
                        key={page.path}
                        className="cursor-pointer border-t border-white/8 hover:bg-white/4"
                        onClick={() => setSelectedPage(page)}
                      >
                        <td className="py-2.5 text-white">
                          {page.title}
                          <span className="mt-0.5 block text-xs text-zinc-500">
                            {page.path}
                          </span>
                        </td>
                        <td className="py-2.5">{formatNumber(page.views)}</td>
                        <td className="py-2.5">{formatNumber(page.visitors)}</td>
                        <td className="py-2.5">
                          {formatSeconds(page.engagementSeconds)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedPage ? (
              <div className="mt-4 rounded-xl border border-white/10 p-4">
                <p className="text-[0.62rem] tracking-[0.18em] text-red-400 uppercase">
                  Selected page
                </p>
                <p className="font-heading mt-1 text-2xl text-white uppercase">
                  {selectedPage.title}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{selectedPage.path}</p>
                <p className="mt-3 text-sm text-zinc-300">
                  {formatNumber(selectedPage.views)} views ·{" "}
                  {formatNumber(selectedPage.visitors)} visitors ·{" "}
                  {formatSeconds(selectedPage.engagementSeconds)} average
                  engagement
                </p>
              </div>
            ) : null}
          </Panel>

          <Panel title="What Miller Fans Are Looking At">
            {data.popularContent.length === 0 ? (
              <p className="text-sm text-zinc-500">Data unavailable</p>
            ) : (
              <ol className="space-y-2">
                {data.popularContent.map((item, index) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-white">
                      {index + 1}. {item.label}
                    </span>
                    <span className="text-zinc-400">{formatNumber(item.views)}</span>
                  </li>
                ))}
              </ol>
            )}
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Where Visitors Came From">
              {data.sources.every((item) => item.visitors == null) ? (
                <p className="text-sm text-zinc-500">Data unavailable</p>
              ) : (
                <ul className="space-y-3">
                  {data.sources.map((source) => (
                    <li key={source.key}>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{source.label}</span>
                        <span className="text-zinc-400">
                          {formatNumber(source.visitors)} ·{" "}
                          {source.percent == null
                            ? "Data unavailable"
                            : `${source.percent.toFixed(1)}%`}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full bg-red-600"
                          style={{ width: `${source.percent ?? 0}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Social Traffic">
              {data.social.every((item) => item.visitors == null) ? (
                <p className="text-sm text-zinc-500">Data unavailable</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
                      <tr>
                        <th className="pb-2 font-medium">Network</th>
                        <th className="pb-2 font-medium">Visitors</th>
                        <th className="pb-2 font-medium">Sessions</th>
                        <th className="pb-2 font-medium">Page Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.social.map((row) => (
                        <tr key={row.key} className="border-t border-white/8">
                          <td className="py-2 text-white">{row.label}</td>
                          <td>{formatNumber(row.visitors)}</td>
                          <td>{formatNumber(row.sessions)}</td>
                          <td>{formatNumber(row.pageViews)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </div>

          <Panel title="Google Search">
            {data.search.configured ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <MiniStat label="Clicks" value={data.search.totals.clicks} />
                  <MiniStat
                    label="Impressions"
                    value={data.search.totals.impressions}
                  />
                  <MiniStat
                    label="CTR"
                    value={
                      data.search.totals.ctr == null
                        ? null
                        : data.search.totals.ctr * 100
                    }
                    suffix="%"
                  />
                  <MiniStat
                    label="Average position"
                    value={data.search.totals.position}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <SearchList title="Top queries" rows={data.search.queries} />
                  <SearchList title="Top landing pages" rows={data.search.pages} />
                </div>
              </div>
            ) : (
              <p className="text-sm leading-6 text-zinc-400">
                {data.search.message ||
                  "Google Search Console is not connected. Add GSC_SITE_URL and give the same service account access to Search Console."}
              </p>
            )}
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Visitor Location">
              {data.oklahomaVisitors != null ? (
                <p className="mb-3 text-sm text-zinc-300">
                  Oklahoma: {formatNumber(data.oklahomaVisitors)} visits
                </p>
              ) : null}
              {data.locations.length === 0 ? (
                <p className="text-sm text-zinc-500">Data unavailable</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {data.locations.map((row) => (
                    <li
                      key={`${row.city}-${row.region}-${row.country}`}
                      className="flex justify-between gap-3"
                    >
                      <span className="text-zinc-300">
                        {row.city}, {row.region}, {row.country}
                      </span>
                      <span className="text-white">{formatNumber(row.visitors)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Devices">
              {data.devices.length === 0 ? (
                <p className="text-sm text-zinc-500">Data unavailable</p>
              ) : (
                <ul className="space-y-3">
                  {data.devices.map((device) => (
                    <li key={device.category}>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{device.category}</span>
                        <span className="text-zinc-400">
                          {formatNumber(device.visitors)} ·{" "}
                          {device.percent == null
                            ? "Data unavailable"
                            : `${device.percent.toFixed(1)}%`}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full bg-red-600"
                          style={{ width: `${device.percent ?? 0}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          <Panel title="Technology">
            {data.browsers.length === 0 && data.operatingSystems.length === 0 ? (
              <p className="text-sm text-zinc-500">Data unavailable</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <TechList title="Browsers" rows={data.browsers} />
                <TechList title="Operating systems" rows={data.operatingSystems} />
              </div>
            )}
          </Panel>

          <Panel title="Quick Insights">
            {data.insights.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Insights appear when Google Analytics returns enough data.
              </p>
            ) : (
              <ul className="space-y-2 text-sm leading-6 text-zinc-300">
                {data.insights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      ) : (
        <p className="mt-10 text-sm text-zinc-500">Loading Command Center…</p>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number | null;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 p-3">
      <p className="text-[0.58rem] tracking-[0.16em] text-zinc-500 uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg text-white">
        {value == null ? "Data unavailable" : `${formatNumber(value)}${suffix}`}
      </p>
    </div>
  );
}

function SearchList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; clicks: number | null }[];
}) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
        {title}
      </p>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-500">Data unavailable</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {rows.map((row) => (
            <li key={row.label} className="flex justify-between gap-3">
              <span className="truncate text-zinc-300">{row.label}</span>
              <span>{formatNumber(row.clicks)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TechList({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; visitors: number | null }[];
}) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.16em] text-zinc-500 uppercase">
        {title}
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {rows.map((row) => (
          <li key={row.name} className="flex justify-between gap-3">
            <span className="text-zinc-300">{row.name}</span>
            <span>{formatNumber(row.visitors)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
