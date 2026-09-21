"use client";

import type { SeriesPoint } from "@/lib/admin-analytics-types";

type SeriesKey = "visitors" | "sessions" | "pageViews";

const labels: Record<SeriesKey, string> = {
  visitors: "Visitors",
  sessions: "Sessions",
  pageViews: "Page Views",
};

export function CommandChart({
  series,
  active,
  onToggle,
}: {
  series: SeriesPoint[];
  active: SeriesKey[];
  onToggle: (key: SeriesKey) => void;
}) {
  const width = 720;
  const height = 220;
  const pad = { l: 36, r: 12, t: 16, b: 28 };
  const keys = active.length > 0 ? active : (["visitors"] as SeriesKey[]);
  const values = series.flatMap((point) =>
    keys.map((key) => point[key]).filter((value): value is number => value != null),
  );
  const max = Math.max(1, ...values);
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  function x(index: number) {
    if (series.length <= 1) return pad.l + innerW / 2;
    return pad.l + (index / (series.length - 1)) * innerW;
  }
  function y(value: number) {
    return pad.t + innerH - (value / max) * innerH;
  }

  const colors: Record<SeriesKey, string> = {
    visitors: "#c8102e",
    sessions: "#f4f1ea",
    pageViews: "#a3a3ab",
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {(Object.keys(labels) as SeriesKey[]).map((key) => {
          const on = active.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] uppercase ${
                on
                  ? "border-red-500/70 bg-red-600/20 text-white"
                  : "border-white/10 text-zinc-500"
              }`}
            >
              {labels[key]}
            </button>
          );
        })}
      </div>
      {series.length === 0 ? (
        <p className="text-sm text-zinc-500">Data unavailable</p>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
          <line
            x1={pad.l}
            y1={pad.t + innerH}
            x2={width - pad.r}
            y2={pad.t + innerH}
            stroke="rgba(255,255,255,0.12)"
          />
          {keys.map((key) => {
            const points = series
              .map((point, index) => {
                const value = point[key];
                if (value == null) return null;
                return `${x(index)},${y(value)}`;
              })
              .filter(Boolean)
              .join(" ");
            if (!points) return null;
            return (
              <polyline
                key={key}
                fill="none"
                stroke={colors[key]}
                strokeWidth="2.5"
                points={points}
              />
            );
          })}
          {series.length <= 14
            ? series.map((point, index) => (
                <text
                  key={point.date}
                  x={x(index)}
                  y={height - 8}
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="9"
                >
                  {point.date.slice(5)}
                </text>
              ))
            : null}
        </svg>
      )}
    </div>
  );
}
