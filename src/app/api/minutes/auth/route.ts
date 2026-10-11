import {
  clearMinutesCookie,
  createMinutesSession,
  MINUTES_COOKIE,
  minutesAccess,
  minutesCookieOptions,
  resolveMinutesRole,
} from "@/lib/minutes-auth";
import { MINUTES_EXPIRED_MESSAGE, MINUTES_IDLE_MS } from "@/lib/minutes-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const access = await minutesAccess();
  if (access.state === "expired") {
    await clearMinutesCookie();
    return NextResponse.json(
      { ok: false, admin: false, expired: true, error: MINUTES_EXPIRED_MESSAGE },
      { status: 401 },
    );
  }
  if (access.state !== "active") {
    return NextResponse.json({ ok: false, admin: false });
  }
  return NextResponse.json({
    ok: true,
    admin: access.role === "admin",
    lastActivity: access.lastActivity,
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
  jar.set(
    MINUTES_COOKIE,
    createMinutesSession(role),
    minutesCookieOptions(MINUTES_IDLE_MS / 1000),
  );
  return NextResponse.json({ ok: true, admin: role === "admin" });
}

export async function DELETE() {
  await clearMinutesCookie();
  return NextResponse.json({ ok: true });
}
