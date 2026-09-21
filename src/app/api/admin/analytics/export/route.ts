import { adminAuthed } from "@/lib/admin-auth";
import {
  analyticsToCsv,
  loadAnalytics,
  type CompareKey,
  type RangeKey,
} from "@/lib/admin-analytics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await adminAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const url = new URL(request.url);
  const range = (url.searchParams.get("range") as RangeKey) || "30d";
  const compare = (url.searchParams.get("compare") as CompareKey) || "auto";
  const start = url.searchParams.get("start") || undefined;
  const end = url.searchParams.get("end") || undefined;
  const payload = await loadAnalytics({ range, compare, start, end });
  const csv = analyticsToCsv(payload);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="yukon-command-center-${payload.range.start}-to-${payload.range.end}.csv"`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
