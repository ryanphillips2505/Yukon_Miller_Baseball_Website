import { PageHero } from "@/components/page-hero";
import { PhotoSlot } from "@/components/photo-slot";
import { fields } from "@/lib/facilities";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Facilities" };

export default function FacilitiesPage() {
  return (
    <div>
      <PageHero
        kicker="Home diamonds"
        title="Facilities"
        lede="Miller Field and The Hill sit behind Yukon High School. Photos of the park will replace these frames when Ryan adds them."
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        {fields.map((field) => (
          <article
            key={field.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 md:grid md:grid-cols-[1.1fr_1fr]"
          >
            <PhotoSlot label={`${field.name} photo coming`} className="min-h-56 md:min-h-full" />
            <div className="p-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                {field.usedBy}
              </p>
              <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
                {field.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{field.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                {field.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <p className="text-sm text-zinc-500">
          {program.street}, {program.cityStateZip}.{" "}
          <a href={program.mapsUrl} className="text-red-400 hover:text-red-300">
            Directions
          </a>
          .
        </p>
      </div>
    </div>
  );
}
