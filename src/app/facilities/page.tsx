import { PageHero } from "@/components/page-hero";
import { fields, parkFacts, parkPhotos, type ParkPhoto } from "@/lib/facilities";
import { program } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Miller Field, home of Yukon Miller Baseball behind Yukon High School.",
};

function PhotoCard({
  photo,
  priority = false,
}: {
  photo: ParkPhoto;
  priority?: boolean;
}) {
  const isTile = photo.layout === "tile";

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      {isTile ? (
        <div className="relative aspect-[4/3]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={priority}
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="h-auto w-full"
        />
      )}
      <figcaption className="flex items-center justify-between border-t border-white/8 px-4 py-3">
        <p className="font-heading text-sm tracking-wide text-white uppercase">
          {photo.caption}
        </p>
        <p className="text-[0.62rem] tracking-[0.18em] text-zinc-500 uppercase">
          Miller Field
        </p>
      </figcaption>
    </figure>
  );
}

export default function FacilitiesPage() {
  const field = fields[0];
  const feature = parkPhotos.find((photo) => photo.layout === "feature");
  const wide = parkPhotos.find((photo) => photo.layout === "wide");
  const tiles = parkPhotos.filter((photo) => photo.layout === "tile");

  return (
    <div className="bg-black">
      <PageHero kicker="Home field" title="Miller Field" />

      <section className="border-b border-white/8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/8 lg:grid-cols-4">
          {parkFacts.map((fact) => (
            <div key={fact.label} className="bg-black px-4 py-5 sm:px-6 sm:py-6">
              <p className="text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase">
                {fact.label}
              </p>
              <p className="mt-2 text-sm tracking-wide text-white sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-3 px-4 py-10 sm:px-6 sm:py-14">
        {feature ? <PhotoCard photo={feature} priority /> : null}
        {wide ? <PhotoCard photo={wide} /> : null}

        <div className="grid gap-3 md:grid-cols-2">
          {tiles.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        <article className="grid gap-8 border-t border-white/8 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.65rem] tracking-[0.22em] text-red-400 uppercase">
              {field.usedBy}
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-4xl">
              The park
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
              {field.summary}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="text-sm leading-6 text-zinc-300">
              {program.street}
              <br />
              {program.cityStateZip}
            </p>
            <a
              href={program.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm tracking-wide text-red-400 uppercase hover:text-red-300"
            >
              Directions
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
