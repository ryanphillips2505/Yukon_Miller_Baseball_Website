"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

export function PublicTrackers() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Analytics />;
}
