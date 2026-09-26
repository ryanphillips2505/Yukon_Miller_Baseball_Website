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

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingExcludes: {
    "*": [
      "./node_modules/@img/**/*",
      "./node_modules/sharp/**/*",
    ],
  },
  async redirects() {
    return [
      {
        source: "/schedule-fields",
        destination: "/schedule",
        permanent: true,
      },
      {
        source: "/players-coaches",
        destination: "/roster",
        permanent: true,
      },
      {
        source: "/players",
        destination: "/roster",
        permanent: true,
      },
      {
        source: "/fields",
        destination: "/facilities",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/coaches",
        permanent: true,
      },
      {
        source: "/info",
        destination: "/support",
        permanent: true,
      },
      {
        source: "/wallpapers",
        destination: "/media",
        permanent: true,
      },
    ];
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
        source: "/concession",
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
      {
        source: "/admin",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
