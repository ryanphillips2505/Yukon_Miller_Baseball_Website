import { MinutesLogin } from "@/components/minutes-login";
import { MinutesVault } from "@/components/minutes-vault";
import { PageHero } from "@/components/page-hero";
import { minutesAuthed } from "@/lib/minutes-auth";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meeting Minutes",
  robots: { index: false, follow: false },
};

export default async function MinutesPage() {
  const unlocked = await minutesAuthed();

  return (
    <div>
      <PageHero
        kicker="Home Run Club"
        title="Meeting Minutes"
        lede="Password-protected PDFs for Home Run Club officers and coaching staff."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {unlocked ? <MinutesVault /> : <MinutesLogin />}
      </div>
    </div>
  );
}
