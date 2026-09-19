import {
  createMinutesSession,
  MINUTES_COOKIE,
  minutesRole,
  minutesCookieOptions,
  resolveMinutesRole,
} from "@/lib/minutes-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const role = await minutesRole();
  return NextResponse.json({
    ok: role !== null,
    admin: role === "admin",
  });
}

export async function POST(request: Request) {
  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Password required." }, { status: 400 });
  }

  const role = resolveMinutesRole(password);
  if (!role) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(MINUTES_COOKIE, createMinutesSession(role), minutesCookieOptions());
  return NextResponse.json({ ok: true, admin: role === "admin" });
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(MINUTES_COOKIE, "", { ...minutesCookieOptions(), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
