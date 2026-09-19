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

function imageSize(src: string, bytes: Buffer) {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }

  let offset = 2;
  while (offset + 9 < bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }

  throw new Error(`Could not read flyer dimensions for ${src}`);
}

const flyerBytes = await readFile(
  join(process.cwd(), "public", liveCamps.flyerSrc.replace(/^\//, "")),
);
const flyerSrc = flyerDataUrl(liveCamps.flyerSrc, flyerBytes);
const flyer = imageSize(liveCamps.flyerSrc, flyerBytes);
const scale = Math.max(size.width / flyer.width, size.height / flyer.height);
const renderWidth = Math.round(flyer.width * scale);
const renderHeight = Math.round(flyer.height * scale);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <img
          src={flyerSrc}
          width={renderWidth}
          height={renderHeight}
          alt=""
          style={{
            width: renderWidth,
            height: renderHeight,
            flexShrink: 0,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
