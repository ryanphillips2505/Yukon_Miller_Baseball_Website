import { adminAuthed } from "@/lib/admin-auth";
import {
  loadAnalytics,
  type CompareKey,
  type RangeKey,
} from "@/lib/admin-analytics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ranges: RangeKey[] = [
  "today",
  "7d",
  "30d",
  "90d",
  "12m",
  "month",
  "year",
  "custom",
];
const compares: CompareKey[] = ["auto", "7d", "30d", "month", "year"];

export async function GET(request: Request) {
  if (!(await adminAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const url = new URL(request.url);
  const range = ranges.includes(url.searchParams.get("range") as RangeKey)
    ? (url.searchParams.get("range") as RangeKey)
    : "30d";
  const compare = compares.includes(url.searchParams.get("compare") as CompareKey)
    ? (url.searchParams.get("compare") as CompareKey)
    : "auto";
  const start = url.searchParams.get("start") || undefined;
  const end = url.searchParams.get("end") || undefined;

  const payload = await loadAnalytics({ range, compare, start, end });
  return NextResponse.json(payload);
}
