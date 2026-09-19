import { minutesAuthed } from "@/lib/minutes-auth";
import {
  isPdfBuffer,
  listMinutes,
  MAX_MINUTES_BYTES,
  safeMinutesName,
  saveMinutes,
} from "@/lib/minutes-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await minutesAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const files = await listMinutes();
  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  if (!(await minutesAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a PDF." }, { status: 400 });
  }
  if (file.size > MAX_MINUTES_BYTES) {
    return NextResponse.json(
      { error: "PDF must be 4 MB or smaller." },
      { status: 400 },
    );
  }

  const name = safeMinutesName(file.name);
  if (!name) {
    return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!(await isPdfBuffer(bytes))) {
    return NextResponse.json({ error: "Only PDF files are allowed." }, { status: 400 });
  }

  try {
    await saveMinutes(name, bytes);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save that PDF.";
    const status = message.includes("Vercel Blob") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }

  const files = await listMinutes();
  return NextResponse.json({ ok: true, files });
}
