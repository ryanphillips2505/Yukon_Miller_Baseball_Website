import { MinutesLogin } from "@/components/minutes-login";
import { MinutesVault } from "@/components/minutes-vault";
import { PageHero } from "@/components/page-hero";
import { minutesRole } from "@/lib/minutes-auth";
import { listMinutes } from "@/lib/minutes-store";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meeting Minutes",
  robots: { index: false, follow: false },
};

export default async function MinutesPage() {
  const role = await minutesRole();
  const files = role ? await listMinutes() : [];

  return (
    <div>
      <PageHero
        kicker="Home Run Club"
        title="Meeting Minutes"
        lede="Password-protected minutes for YUKON HS HOME RUN CLUB officers and coaching staff."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {role ? (
          <MinutesVault initialFiles={files} canAdmin={role === "admin"} />
        ) : (
          <MinutesLogin />
        )}
      </div>
    </div>
  );
}
