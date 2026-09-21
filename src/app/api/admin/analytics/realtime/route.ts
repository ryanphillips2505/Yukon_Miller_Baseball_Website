import { adminAuthed } from "@/lib/admin-auth";
import { loadRealtime } from "@/lib/admin-analytics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await adminAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  return NextResponse.json(await loadRealtime());
}
