import { liveCamps } from "@/lib/camps";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = liveCamps.flyerAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function flyerDataUrl(src: string, bytes: Buffer) {
  const ext = src.split(".").pop()?.toLowerCase();
  const type =
    ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  return `data:${type};base64,${bytes.toString("base64")}`;
}

const flyerBytes = await readFile(
  join(process.cwd(), "public", liveCamps.flyerSrc.replace(/^\//, "")),
);
const flyerSrc = flyerDataUrl(liveCamps.flyerSrc, flyerBytes);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <img
          src={flyerSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
