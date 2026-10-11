import { requireMinutes } from "@/lib/minutes-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const { access, response } = await requireMinutes({ touch: true });
  if (response) return response;
  if (access.state !== "active") {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    admin: access.role === "admin",
    lastActivity: access.lastActivity,
  });
}
