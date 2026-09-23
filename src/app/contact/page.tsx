import { OrganizationInfo } from "@/components/organization-info";
import { PageHero } from "@/components/page-hero";
import { officers } from "@/lib/support";
import { publicPageSeo } from "@/lib/seo";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", ...publicPageSeo("/contact") };

export default function ContactPage() {
  return (
    <div>
      <PageHero kicker="Staff & HRC" title="Contact" />
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <OrganizationInfo variant="contact" />
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-xl tracking-wide text-white uppercase">
              Miller Field
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Baseball field / game location
            </p>
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
              YUKON HS HOME RUN CLUB officers
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
