import { BrandLogo } from "@/components/brand-logo";
import { EmptyState } from "@/components/empty-state";
import { PhotoSlot } from "@/components/photo-slot";
import { buttonVariants } from "@/components/ui/button";
import { coaches } from "@/lib/coaches";
import { latestArticles } from "@/lib/news";
import { program, teams } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

const hubs = [
  {
    href: "/schedule",
    label: "Schedule",
    copy: "Varsity, JV Red, and JV White on one board once the staff posts dates.",
  },
  {
    href: "/roster",
    label: "Roster",
    copy: "The program roster, A–Z, with bats and throws. No filler photos.",
  },
  {
    href: "/news",
    label: "News",
    copy: "Commits, weather calls, and program notes families can actually use.",
  },
  {
    href: "/support",
    label: "Home Run Club",
    copy: "Sponsorships, volunteers, and the parent group that keeps two fields going.",
  },
  {
    href: "/fans",
    label: "Fan info",
    copy: "Where to park, which diamond, and how to find a Friday night game.",
  },
  {
    href: "/recruiting",
    label: "Recruiting",
    copy: "College commits and a direct line for coaches who want film or visits.",
  },
];

export default function HomePage() {
  const news = latestArticles(3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/8 bg-black">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
          <BrandLogo
            variant="primary"
            priority
            sizes="(max-width: 640px) 94vw, (max-width: 1024px) 90vw, 1152px"
            className="mx-auto h-auto w-full"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6 sm:pb-16">
          <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
            Yukon High School · {program.classification}
          </p>
          <h1 className="font-heading mt-3 text-4xl leading-[0.92] text-white uppercase sm:text-6xl">
            Home of the Millers
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Yukon Miller baseball is the next step for a top-end Class 6A
            program — players, families, and the Home Run Club on one site
            that is built to be used, not just looked at.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/schedule"
              className={cn(buttonVariants(), "h-11 px-5 text-sm uppercase")}
            >
              See the schedule
            </Link>
            <Link
              href="/roster"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-white/20 px-5 text-sm uppercase",
              )}
            >
              View the roster
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-px bg-white/8 sm:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id} className="bg-zinc-950 px-6 py-6">
              <p className="text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
                {team.label}
              </p>
              <p className="font-heading mt-2 text-xl tracking-wide text-white uppercase">
                {team.field}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Dates post on the schedule board.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              Latest
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
              From the program
            </h2>
          </div>
          <Link href="/news" className="text-sm text-zinc-400 hover:text-white">
            All news
          </Link>
        </div>
        {news.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No updates posted"
            body="Commits, weather calls, and program notes will show here. Nothing is invented to fill the page."
          />
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {news.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-colors hover:border-red-700/50"
              >
                <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
                  {article.category}
                </p>
                <h3 className="font-heading mt-2 text-2xl tracking-wide text-white uppercase">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-white/8 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
            For families
          </p>
          <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
            Everything a Miller week needs
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 hover:border-white/25"
              >
                <p className="font-heading text-lg tracking-wide text-white uppercase">
                  {hub.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{hub.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              Staff
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
              The coaches
            </h2>
          </div>
          <Link href="/coaches" className="text-sm text-zinc-400 hover:text-white">
            Full staff
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {coaches.slice(0, 5).map((coach) => (
            <div
              key={coach.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
            >
              <PhotoSlot label="Photo coming" className="aspect-[4/5]" />
              <div className="p-3">
                <p className="font-heading text-sm tracking-wide text-white uppercase">
                  {coach.name}
                </p>
                <p className="text-xs text-zinc-500">{coach.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-black">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="font-heading text-2xl leading-snug tracking-wide text-white uppercase sm:text-3xl">
            “{program.quote.text}”
          </p>
          <p className="mt-4 text-sm tracking-[0.18em] text-zinc-500 uppercase">
            {program.quote.attribution}
          </p>
          <p className="mt-8 text-sm leading-6 text-zinc-400">
            {program.directions} Please come by and catch a game.
          </p>
          <Link
            href="/facilities"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 h-10 border-white/20 px-4",
            )}
          >
            Field guide
          </Link>
        </div>
      </section>
    </div>
  );
}
