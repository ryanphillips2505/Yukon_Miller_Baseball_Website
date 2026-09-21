import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSession,
  passwordMatchesAdmin,
} from "@/lib/admin-session";
import { adminAuthed } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await adminAuthed() });
}

export async function POST(request: Request) {
  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Password required." }, { status: 400 });
  }

  if (!passwordMatchesAdmin(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, createAdminSession(), adminCookieOptions());
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
