export const GA_MEASUREMENT_ID = "G-KJDVJT6PCR";

export const gaCalendarEvents = {
  google: "calendar_google_click",
  apple: "calendar_apple_click",
  outlook: "calendar_outlook_click",
  ics: "calendar_ics_click",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function gaEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}
