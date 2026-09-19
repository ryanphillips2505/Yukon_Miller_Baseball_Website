import { minutesAuthed } from "@/lib/minutes-auth";
import {
  createMinutesUploadUrl,
  MAX_MINUTES_BYTES,
  minutesUsesBlob,
  safeMinutesName,
} from "@/lib/minutes-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await minutesAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  if (!minutesUsesBlob()) {
    return NextResponse.json(
      { error: "Direct upload is not available here." },
      { status: 503 },
    );
  }

  let body: { name?: unknown; size?: unknown };
  try {
    body = (await request.json()) as { name?: unknown; size?: unknown };
  } catch {
    return NextResponse.json({ error: "Choose a document." }, { status: 400 });
  }

  const size = typeof body.size === "number" ? body.size : Number(body.size);
  if (!Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "Choose a document." }, { status: 400 });
  }
  if (size > MAX_MINUTES_BYTES) {
    return NextResponse.json(
      { error: "File must be 80 MB or smaller." },
      { status: 400 },
    );
  }

  const name = safeMinutesName(typeof body.name === "string" ? body.name : "");
  if (!name) {
    return NextResponse.json(
      { error: "Use a PDF, Word .doc, or .docx file." },
      { status: 400 },
    );
  }

  try {
    const upload = await createMinutesUploadUrl(name);
    return NextResponse.json(upload);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "storage error";
    return NextResponse.json(
      { error: `Could not start upload (${detail}).` },
      { status: 500 },
    );
  }
}
