import { fields, parkPhotos } from "@/lib/facilities";
import { program } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Miller Field, home of Yukon Miller Baseball behind Yukon High School.",
};

export default function FacilitiesPage() {
  const field = fields[0];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/8 bg-black">
        <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-[34rem]">
          <Image
            src={parkPhotos.night.src}
            alt={parkPhotos.night.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10">
              <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                Home field
              </p>
              <h1 className="font-heading mt-2 text-5xl tracking-wide text-white uppercase sm:text-7xl">
                Miller Field
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <Image
              src={parkPhotos.diamond.src}
              alt={parkPhotos.diamond.alt}
              width={parkPhotos.diamond.width}
              height={parkPhotos.diamond.height}
              sizes="(max-width: 1024px) 100vw, 640px"
              className="h-auto w-full"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <Image
              src={parkPhotos.yukonY.src}
              alt={parkPhotos.yukonY.alt}
              width={parkPhotos.yukonY.width}
              height={parkPhotos.yukonY.height}
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-auto w-full"
            />
          </figure>
        </div>

        <article className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
            {field.usedBy}
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
            {field.name}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            {field.summary}
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            {field.notes.map((note) => (
              <li
                key={note}
                className="rounded-xl border border-white/8 bg-black px-4 py-3 text-sm text-zinc-300"
              >
                {note}
              </li>
            ))}
          </ul>
        </article>

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
