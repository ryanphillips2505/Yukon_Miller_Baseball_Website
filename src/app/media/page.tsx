import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { PhotoSlot } from "@/components/photo-slot";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Media" };

export default function MediaPage() {
  return (
    <div>
      <PageHero
        kicker="Gallery"
        title="Media"
        lede="Game photos, wallpapers, and video land here when the program drops files. These frames stay empty on purpose."
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <EmptyState
          title="No media uploaded"
          body="Send team photos, phone wallpapers, or highlight links to the staff. Nothing here is stock and nothing is pulled from another school."
          action={{ href: "/contact", label: "Send media" }}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Varsity", "JV Red", "JV White", "Miller Field"].map((label) => (
            <PhotoSlot
              key={label}
              label={`${label} coming`}
              className="aspect-[3/4] rounded-2xl border border-white/8"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
