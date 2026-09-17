import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { officers } from "@/lib/support";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <PageHero
        kicker="Staff & HRC"
        title="Contact"
        lede="The program email is the same one families already use. Write the staff, the Home Run Club, or a college coach note from here."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Write us
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Opens your email app to {program.email}. Nothing is stored on this
            site.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-xl tracking-wide text-white uppercase">
              Direct
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              <a className="text-red-400 hover:text-red-300" href={`mailto:${program.email}`}>
                {program.email}
              </a>
            </p>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              {program.street}
              <br />
              {program.cityStateZip}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="font-heading text-xl tracking-wide text-white uppercase">
              Home Run Club officers
            </h2>
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
