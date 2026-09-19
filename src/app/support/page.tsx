import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { hrc, officers, tcaStore } from "@/lib/support";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Home Run Club" };

export default function SupportPage() {
  return (
    <div>
      <PageHero
        kicker="Boosters"
        title="Home Run Club"
        lede={hrc.about}
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:space-y-8 sm:px-6">
        <section className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
              Officers
            </h2>
            <ul className="mt-5 flex-1 space-y-3">
              {officers.map((officer) => (
                <li
                  key={officer.name}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-white">{officer.name}</span>
                  <span className="text-zinc-500">{officer.role}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${hrc.email}`}
              className={cn(buttonVariants(), "mt-8 h-10 w-fit px-4")}
            >
              Email YHRC
            </a>
          </div>
          <div className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
              How it runs
            </h2>
            <div className="mt-5 flex-1 space-y-5">
              {hrc.howItRuns.map((item) => (
                <div key={item.title}>
                  <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
                    {item.title}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={hrc.venmoHref}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants(), "mt-8 h-10 w-fit px-4")}
            >
              Pay HRC Venmo
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            Volunteer
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            Varsity, JV Red, and JV White each need gate, concession, and
            field help. Pick a shift on the board.
          </p>
          <a
            href={hrc.volunteerSignup.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block font-heading text-2xl tracking-wide text-red-400 uppercase underline decoration-red-400 decoration-2 underline-offset-8 transition-colors hover:text-red-300 hover:decoration-red-300 sm:text-3xl"
          >
            {hrc.volunteerSignup.label}
          </a>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase sm:text-3xl">
            {tcaStore.name}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
            {tcaStore.blurb}
          </p>
          <a
            href={tcaStore.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 h-10 border-white/15 px-4",
            )}
          >
            Open TCA · code {tcaStore.code}
          </a>
        </section>
      </div>
    </div>
  );
}
