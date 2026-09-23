import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { publicPageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Records", ...publicPageSeo("/records") };

const tables = [
  {
    title: "Season records",
    copy: "Year, overall, district, and postseason finish.",
  },
  {
    title: "All-state & honors",
    copy: "All-state, all-district, and academic awards.",
  },
  {
    title: "Program marks",
    copy: "Wins, championships, and single-season notes worth keeping.",
  },
];

export default function RecordsPage() {
  return (
    <div>
      <PageHero
        kicker="History"
        title="Records"
        lede="The ledger stays empty until the program supplies years and numbers. No borrowed stats, no guessed records."
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
        <EmptyState
          title="Record book is not posted"
          body="When the staff sends season finishes, all-state names, and program marks, they will sit in the tables below. Until then this page is honest about what we do not have."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {tables.map((table) => (
            <div
              key={table.title}
              className="rounded-2xl border border-dashed border-white/12 bg-zinc-950 p-5"
            >
              <h2 className="font-heading text-lg tracking-wide text-white uppercase">
                {table.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">{table.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
