import { minutesAuthed } from "@/lib/minutes-auth";
import {
  isAllowedDocument,
  listMinutes,
  MAX_MINUTES_BYTES,
  safeMinutesName,
  saveMinutes,
} from "@/lib/minutes-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
    return NextResponse.json({ error: "Choose a document." }, { status: 400 });
  }
  if (file.size > MAX_MINUTES_BYTES) {
    return NextResponse.json(
      { error: "File must be 4.5 MB or smaller." },
      { status: 400 },
    );
  }

  const name = safeMinutesName(file.name);
  if (!name) {
    return NextResponse.json(
      { error: "Use a PDF, Word .doc, or .docx file." },
      { status: 400 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!(await isAllowedDocument(name, bytes))) {
    return NextResponse.json(
      { error: "Use a PDF, Word .doc, or .docx file." },
      { status: 400 },
    );
  }

  try {
    await saveMinutes(name, bytes);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save that file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const files = await listMinutes();
  return NextResponse.json({ ok: true, files });
}
