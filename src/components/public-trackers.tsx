"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import Script from "next/script";

export function PublicTrackers() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {measurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-command-center" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      <Analytics />
    </>
  );
}
