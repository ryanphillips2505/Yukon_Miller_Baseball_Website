import { buttonVariants } from "@/components/ui/button";
import {
  featuredSponsors,
  sponsorCount,
  sponsorshipForm,
  sponsorsByTier,
  sponsorTiers,
  type Sponsor,
  type SponsorTierId,
} from "@/lib/sponsors";
import { program } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Mark({
  sponsor,
  size = "md",
}: {
  sponsor: Sponsor;
  size?: "sm" | "md" | "lg";
}) {
  if (sponsor.logo) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f4f1ea] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_0_0_1px_rgba(0,0,0,0.18)]",
          size === "sm" && "h-12 w-[5.5rem] p-1.5",
          size === "md" && "h-14 w-[6.75rem] p-2",
          size === "lg" && "h-[4.5rem] w-[9.5rem] p-2.5",
        )}
      >
        <Image
          src={sponsor.logo.src}
          alt=""
          width={sponsor.logo.width}
          height={sponsor.logo.height}
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-red-950/80 via-zinc-950 to-black font-heading tracking-wide text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        size === "sm" && "h-12 w-12 text-sm",
        size === "md" && "h-14 w-14 text-lg",
        size === "lg" && "h-[4.5rem] w-[4.5rem] text-2xl",
      )}
      aria-hidden
    >
      {sponsor.mark}
    </div>
  );
}

function SponsorTile({
  sponsor,
  featured = false,
}: {
  sponsor: Sponsor;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-5 transition-colors hover:border-red-700/40",
        featured && "p-6 sm:p-7",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/70 to-transparent" />
      <div className="flex items-center gap-4">
        <Mark sponsor={sponsor} size={featured ? "lg" : "md"} />
        <div className="min-w-0">
          {sponsor.newThisYear ? (
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
              New for 2026
            </p>
          ) : null}
          <h3
            className={cn(
              "font-heading tracking-wide text-white uppercase",
              featured ? "mt-1 text-3xl sm:text-4xl" : "mt-1 text-xl",
            )}
          >
            {sponsor.name}
          </h3>
        </div>
      </div>
    </article>
  );
}

function TierHead({ tierId }: { tierId: SponsorTierId }) {
  const tier = sponsorTiers.find((item) => item.id === tierId);
  if (!tier) return null;

  return (
    <div>
      <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
        {tier.kicker}
      </p>
      <h3 className="font-heading mt-1 text-2xl tracking-wide text-white uppercase sm:text-3xl">
        {tier.label}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
        {tier.blurb}
      </p>
    </div>
  );
}

function TierBlock({
  tierId,
  featured = false,
  columns,
}: {
  tierId: SponsorTierId;
  featured?: boolean;
  columns: string;
}) {
  const list = sponsorsByTier(tierId);
  if (list.length === 0) return null;

  return (
    <div>
      <TierHead tierId={tierId} />
      <div className={cn("mt-4 grid gap-3", columns)}>
        {list.map((sponsor) => (
          <SponsorTile key={sponsor.id} sponsor={sponsor} featured={featured} />
        ))}
      </div>
    </div>
  );
}

export function SponsorBoard() {
  const presenting = sponsorsByTier("presenting");
  const scoreboard = sponsorsByTier("scoreboard");

  return (
    <div className="space-y-14">
      <section className="overflow-hidden rounded-2xl border border-white/12 bg-black">
        <header className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#1a0a0d_0%,#0a0a0c_100%)] px-5 py-8 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,16,46,0.28),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
                2026 partners
              </p>
              <h2 className="font-heading mt-2 text-4xl leading-none tracking-wide text-white uppercase sm:text-6xl">
                The wall
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div>
                <p className="font-heading text-5xl leading-none text-white">
                  {String(sponsorCount).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
                  On the board
                </p>
              </div>
              <a
                href={sponsorshipForm.href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants(), "h-10 px-4 uppercase")}
              >
                2026–27 packet
              </a>
            </div>
          </div>
        </header>

        <div className="space-y-10 px-5 py-8 sm:px-8">
          {presenting.map((sponsor) => (
            <article
              key={sponsor.id}
              className="relative overflow-hidden rounded-2xl border border-red-700/40 bg-[linear-gradient(135deg,#2a0b12_0%,#0a0a0c_55%)] p-6 sm:p-10"
            >
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
                Presenting partner
              </p>
              <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
                <Mark sponsor={sponsor} size="lg" />
                <div>
                  <h3 className="font-heading text-4xl leading-none tracking-wide text-white uppercase sm:text-6xl">
                    {sponsor.name}
                  </h3>
                </div>
              </div>
            </article>
          ))}

          {scoreboard.map((sponsor) => (
            <article
              key={sponsor.id}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#1a1014_0%,#0a0a0c_55%)] p-6 sm:p-10"
            >
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-red-400 uppercase">
                Scoreboard · title partner
              </p>
              <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
                <Mark sponsor={sponsor} size="lg" />
                <div>
                  <h3 className="font-heading text-4xl leading-none tracking-wide text-white uppercase sm:text-5xl">
                    {sponsor.name}
                  </h3>
                </div>
              </div>
            </article>
          ))}

          <TierBlock tierId="cycle" featured columns="grid-cols-1" />
          <TierBlock
            tierId="grand-slam"
            featured
            columns="md:grid-cols-3"
          />
          <TierBlock tierId="signature" featured columns="md:grid-cols-2" />
          <TierBlock tierId="special" columns="md:grid-cols-2" />
        </div>
      </section>

      <TierBlock
        tierId="home-run"
        columns="sm:grid-cols-2 lg:grid-cols-3"
      />
      <TierBlock tierId="triple" columns="md:grid-cols-2" />

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-zinc-900 lg:border-r lg:border-white/10">
            {sponsorshipForm.previews.map((preview, index) => (
              <a
                key={preview.src}
                href={sponsorshipForm.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Image
                  src={preview.src}
                  alt={`${sponsorshipForm.title}, page ${index + 1} of ${sponsorshipForm.pages}`}
                  width={preview.width}
                  height={preview.height}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </a>
            ))}
          </div>
          <div className="flex flex-col justify-start px-6 py-8 sm:px-10 lg:sticky lg:top-6 lg:self-start">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              2026–27 season
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-4xl">
              Put your name on Miller Field
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              Official four-page packet: packages from Single through Foul
              Ball, plus the form YHRC uses for artwork and payment. Open it,
              fill it in, and send it to the club.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={sponsorshipForm.href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants(), "h-11 px-5 uppercase")}
              >
                Open the packet
              </a>
              <a
                href={`mailto:${program.email}?subject=${encodeURIComponent("Yukon Baseball sponsorship")}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 border-white/15 px-5 uppercase",
                )}
              >
                Email {program.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SponsorStrip() {
  return (
    <section className="border-b border-white/8 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              2026 partners
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase">
              They back the Millers
            </h2>
          </div>
          <Link href="/sponsors" className="text-sm text-zinc-400 hover:text-white">
            See all {sponsorCount}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featuredSponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              href="/sponsors"
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-3 py-5 text-center transition-colors hover:border-red-700/40"
            >
              <Mark sponsor={sponsor} size="md" />
              <p className="font-heading text-sm leading-tight tracking-wide text-white uppercase">
                {sponsor.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
