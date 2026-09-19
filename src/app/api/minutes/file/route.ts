import { minutesAuthed } from "@/lib/minutes-auth";
import {
  createMinutesDownloadUrl,
  deleteMinutes,
  minutesUsesBlob,
  readMinutes,
  safeMinutesName,
} from "@/lib/minutes-store";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function fileNameFrom(request: Request) {
  const url = new URL(request.url);
  return safeMinutesName(url.searchParams.get("name") ?? "");
}

export async function GET(request: Request) {
  if (!(await minutesAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const name = fileNameFrom(request);
  if (!name) {
    return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
  }

  if (minutesUsesBlob()) {
    try {
      const url = await createMinutesDownloadUrl(name);
      return NextResponse.redirect(url, 302);
    } catch {
      // Fall through to a proxied download.
    }
  }

  const bytes = await readMinutes(name);
  if (!bytes) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const ext = name.toLowerCase().slice(name.lastIndexOf("."));
  const type =
    ext === ".pdf"
      ? "application/pdf"
      : ext === ".docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : ext === ".doc"
          ? "application/msword"
          : "application/octet-stream";

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${name.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

export async function DELETE(request: Request) {
  if (!(await minutesAuthed())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const name = fileNameFrom(request);
  if (!name) {
    return NextResponse.json({ error: "Invalid file name." }, { status: 400 });
  }

  await deleteMinutes(name);
  return NextResponse.json({ ok: true });
}
