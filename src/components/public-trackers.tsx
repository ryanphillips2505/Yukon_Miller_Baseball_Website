"use client";

import { GoogleAnalytics } from "@/components/google-analytics";
import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

export function PublicTrackers() {
  const pathname = usePathname();
  return (
    <>
      <GoogleAnalytics pathname={pathname} />
      <Analytics />
    </>
  );
}
