import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const defaultOgImage = "/images/yukon-baseball-primary-logo.png";

function dataUrl(src: string, bytes: Buffer) {
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

  throw new Error(`Could not read image dimensions for ${src}`);
}

export async function ogCoverImage(publicSrc: string) {
  const bytes = await readFile(
    join(process.cwd(), "public", publicSrc.replace(/^\//, "")),
  );
  const { width, height } = imageSize(publicSrc, bytes);
  const scale = Math.max(
    ogImageSize.width / width,
    ogImageSize.height / height,
  );
  const renderWidth = Math.round(width * scale);
  const renderHeight = Math.round(height * scale);

  return new ImageResponse(
    (
      <div
        style={{
          width: ogImageSize.width,
          height: ogImageSize.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0a0a0c",
        }}
      >
        <img
          src={dataUrl(publicSrc, bytes)}
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
    { ...ogImageSize },
  );
}
