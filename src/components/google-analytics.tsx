"use client";

import { GA_MEASUREMENT_ID } from "@/lib/ga";
import Script from "next/script";
import { useEffect, useRef } from "react";

export function GoogleAnalytics({ pathname }: { pathname: string }) {
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="yukon-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
