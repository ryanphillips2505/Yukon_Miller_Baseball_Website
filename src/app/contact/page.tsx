import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { officers } from "@/lib/support";
import { program } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <PageHero
        kicker="Staff & HRC"
        title="Contact"
        lede="Write the program at the Yukon Baseball email. There is no public comment box on this site."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
            Program email
          </p>
          <h2 className="font-heading mt-3 text-3xl tracking-wide text-white uppercase sm:text-4xl">
            Email the staff
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
            Families, college coaches, and media use the same address. Open it
            in your email app — nothing is typed or stored on this page.
          </p>
          <a
            href={`mailto:${program.email}`}
            className="mt-6 block break-all text-xl text-red-400 hover:text-red-300 sm:text-2xl"
          >
            {program.email}
          </a>
          <a
            href={`mailto:${program.email}`}
            className={cn(buttonVariants(), "mt-6 h-11 px-5 uppercase")}
          >
            Open email
          </a>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-xl tracking-wide text-white uppercase">
              Miller Field
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {program.street}
              <br />
              {program.cityStateZip}
            </p>
            <a
              href={program.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-red-400 hover:text-red-300"
            >
              Map to Miller Field
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-xl tracking-wide text-white uppercase">
              Home Run Club officers
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Reach HRC through {program.email}.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {officers.map((officer) => (
                <li key={officer.name} className="flex justify-between gap-3">
                  <span className="text-zinc-200">{officer.name}</span>
                  <span className="text-zinc-500">{officer.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
