"use client";

import { GA_MEASUREMENT_ID } from "@/lib/ga";
import Script from "next/script";
import { useEffect, useRef } from "react";

const HISTORY_PAGE_VIEW = "gtm.historyChange-v2";

function isAutomaticHistoryPageView(item: unknown) {
  if (!item || typeof item !== "object") return false;
  const record = item as { event?: unknown; 0?: unknown };
  return record.event === HISTORY_PAGE_VIEW || record[0] === HISTORY_PAGE_VIEW;
}

// GA4 enhanced measurement also sends a deferred page_view on history changes.
// Those hits omit page_path. Ignore them so each client navigation is counted once.
function ignoreAutomaticHistoryPageViews() {
  const dataLayer = window.dataLayer;
  if (!dataLayer || dataLayer.push === filteredDataLayerPush) return;

  const originalPush = dataLayer.push.bind(dataLayer);
  let applying = false;
  filteredDataLayerPush = function pushWithoutHistoryPageViews(...items: unknown[]) {
    if (!applying && items.some(isAutomaticHistoryPageView)) return dataLayer.length;
    applying = true;
    try {
      return originalPush(...items);
    } finally {
      applying = false;
    }
  } as typeof dataLayer.push;
  dataLayer.push = filteredDataLayerPush;
}

let filteredDataLayerPush: typeof Array.prototype.push | null = null;

export function GoogleAnalytics({ pathname }: { pathname: string }) {
  const isFirstPath = useRef(true);
  const lastTitle = useRef("");

  useEffect(() => {
    ignoreAutomaticHistoryPageViews();

    let cancelled = false;
    let observer: MutationObserver | undefined;
    let timer: number | undefined;
    const pagePath = pathname;

    const rememberTitle = () => {
      if (document.title) lastTitle.current = document.title;
    };

    if (isFirstPath.current) {
      isFirstPath.current = false;
      rememberTitle();
      if (!lastTitle.current) {
        observer = new MutationObserver(() => {
          rememberTitle();
          if (lastTitle.current) observer?.disconnect();
        });
        observer.observe(document.head, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
      return () => observer?.disconnect();
    }

    if (typeof window.gtag !== "function") return;

    let sent = false;
    const send = (allowUnchangedTitle: boolean) => {
      if (sent || cancelled || typeof window.gtag !== "function") return;
      if (window.location.pathname !== pagePath) return;
      const pageTitle = document.title;
      if (!pageTitle) return;
      if (!allowUnchangedTitle && lastTitle.current && pageTitle === lastTitle.current) return;
      sent = true;
      lastTitle.current = pageTitle;
      window.gtag("event", "page_view", {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
      });
      observer?.disconnect();
      if (timer) window.clearTimeout(timer);
    };

    send(false);
    if (!sent) {
      observer = new MutationObserver(() => send(false));
      observer.observe(document.head, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      timer = window.setTimeout(() => send(true), 1000);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={ignoreAutomaticHistoryPageViews}
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
