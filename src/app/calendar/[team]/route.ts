import {
  parseCalendarTeamParam,
  teamCalendarIcs,
  teamCalendarName,
} from "@/lib/calendar";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: Request,
  context: { params: Promise<{ team: string }> },
) {
  const { team } = await context.params;
  const id = parseCalendarTeamParam(team);
  if (!id) {
    return new NextResponse("Unknown team calendar.", { status: 404 });
  }

  const body = teamCalendarIcs(id);
  const filename = `${teamCalendarName(id).replaceAll(" ", "-").toLowerCase()}.ics`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
}
