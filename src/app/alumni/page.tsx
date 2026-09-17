import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Alumni" };

export default function AlumniPage() {
  return (
    <div>
      <PageHero
        kicker="Millers for life"
        title="Alumni"
        lede="College, pro, and all-time Miller lists will live here. We are not inventing a hall of fame to fill the wall."
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
        <EmptyState
          title="Alumni roll is not posted"
          body="Send names, years, and next schools to the staff when you have them. This page will hold all-time players, college commits, and anyone who reached pro ball."
          action={{ href: `mailto:${program.email}`, label: "Email an alum note" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "All-time Millers", copy: "A-Z player list by graduating class." },
            { title: "College Millers", copy: "Where Yukon players kept playing." },
            { title: "Pro Millers", copy: "Drafted or signed players, when we have them." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-dashed border-white/12 bg-zinc-950 p-5"
            >
              <p className="font-heading text-lg tracking-wide text-white uppercase">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
