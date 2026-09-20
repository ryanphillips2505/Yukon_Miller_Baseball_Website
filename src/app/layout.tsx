import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { program } from "@/lib/site";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return new URL(explicit);

  // Production shares should use the public domain, not a Vercel preview host.
  if (process.env.VERCEL_ENV === "production") {
    return new URL("https://www.yukonbaseball.com");
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (vercelProduction) return new URL(`https://${vercelProduction}`);

  const vercelDeployment = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelDeployment) return new URL(`https://${vercelDeployment}`);

  return new URL("http://127.0.0.1:43217");
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: {
    default: "Yukon Miller Baseball",
    template: "%s | Yukon Miller Baseball",
  },
  description:
    "Yukon High School baseball. Home of the Millers. Schedule, roster, coaches, news, and Home Run Club.",
  icons: {
    icon: [
      { url: "/icons/ym-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/ym-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/ym-64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/ym.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: "/icons/ym.ico",
    apple: [{ url: "/icons/ym-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icons/ym-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icons/ym-16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/icons/ym-64.png" type="image/png" sizes="64x64" />
        <link rel="shortcut icon" href="/icons/ym.ico" />
        <link
          rel="apple-touch-icon"
          href="/icons/ym-180.png"
          sizes="180x180"
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-red-700 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to {program.shortName} content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
