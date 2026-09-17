import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Camps" };

export default function CampsPage() {
  return (
    <div>
      <PageHero
        kicker="Player development"
        title="Camps"
        lede="Youth and high-school camp dates, costs, and registration land here when the staff publishes them. Old flyers stay off this page."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <EmptyState
          title="Next camp is not posted"
          body={`When Yukon hosts a skills camp, father-son overnight, or summer session, the date, ages, cost, and how to pay will show here. Questions now go to ${program.email}.`}
          action={{ href: "/contact", label: "Ask about camps" }}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Youth skills", "High school", "Overnight / family"].map((label) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-5"
            >
              <p className="font-heading text-lg tracking-wide text-white uppercase">
                {label}
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Slot reserved for the next published session.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
