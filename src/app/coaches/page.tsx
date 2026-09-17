import { PageHero } from "@/components/page-hero";
import { PhotoSlot } from "@/components/photo-slot";
import { coaches, managersNote } from "@/lib/coaches";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Coaches" };

export default function CoachesPage() {
  return (
    <div>
      <PageHero
        kicker="Staff"
        title="Coaches"
        lede="The Yukon Miller staff as listed by the program. Headshots post when Ryan adds them — the names are already here."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <article
              key={coach.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
            >
              <PhotoSlot
                label="Staff photo coming"
                src={coach.photo}
                alt={coach.name}
                className="aspect-[4/5]"
              />
              <div className="p-5">
                <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                  {coach.role}
                </p>
                <h2 className="font-heading mt-1 text-2xl tracking-wide text-white uppercase">
                  {coach.name}
                </h2>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-xl tracking-wide text-white uppercase">
            Managers and trainers
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{managersNote}</p>
          <p className="mt-4 text-sm text-zinc-500">
            College coaches and families can reach the staff at{" "}
            <a className="text-red-400 hover:text-red-300" href={`mailto:${program.email}`}>
              {program.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
