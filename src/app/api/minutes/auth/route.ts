import {
  checkMinutesPassword,
  createMinutesSession,
  MINUTES_COOKIE,
  minutesAuthed,
  minutesCookieOptions,
} from "@/lib/minutes-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await minutesAuthed() });
}

export async function POST(request: Request) {
  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Password required." }, { status: 400 });
  }

  if (!checkMinutesPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(MINUTES_COOKIE, createMinutesSession(), minutesCookieOptions());
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(MINUTES_COOKIE, "", { ...minutesCookieOptions(), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
