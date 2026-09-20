import {
  parseCalendarTeamParam,
  teamCalendarIcs,
  teamCalendarName,
} from "@/lib/calendar";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { team: "varsity.ics" },
    { team: "jv-red.ics" },
    { team: "jv-white.ics" },
    { team: "varsity" },
    { team: "jv-red" },
    { team: "jv-white" },
  ];
}

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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
