import type { NextConfig } from "next";

const packetHeaders = [
  {
    key: "Content-Disposition",
    value: 'inline; filename="Yukon-Millers-Sponsorship-Packet-2026-2027.pdf"',
  },
  {
    key: "Content-Type",
    value: "application/pdf",
  },
];

const minutesTrace = [
  "./src/lib/minutes-ssh.mjs",
  "./node_modules/dugite/git/**",
  "./node_modules/ssh2/**",
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingIncludes: {
    "/api/minutes": minutesTrace,
    "/api/minutes/file": minutesTrace,
    "/api/minutes/auth": minutesTrace,
    "/minutes": minutesTrace,
  },
  async headers() {
    return [
      {
        source: "/2026-2027-sponsorship-packet.pdf",
        headers: packetHeaders,
      },
      {
        source: "/2026-2027-sponsorship-form.pdf",
        headers: packetHeaders,
      },
      {
        source: "/minutes",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/minutes",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/minutes/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
