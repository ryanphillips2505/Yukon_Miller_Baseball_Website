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
  compact = false,
}: {
  sponsor: Sponsor;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-5 transition-colors hover:border-red-700/40",
        featured && "p-6 sm:p-7",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/70 to-transparent" />
      <div
        className={cn(
          "flex gap-4",
          compact ? "flex-col items-start" : "items-center",
        )}
      >
        <Mark
          sponsor={sponsor}
          size={featured && !compact ? "lg" : "md"}
        />
        <div className="min-w-0 w-full">
          {sponsor.kicker ? (
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
              {sponsor.kicker}
            </p>
          ) : sponsor.newThisYear ? (
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
              New for 2026
            </p>
          ) : null}
          <h3
            className={cn(
              "font-heading text-white uppercase",
              compact
                ? "mt-1 text-xl leading-none tracking-[0.08em] sm:text-2xl"
                : featured
                  ? "mt-1 text-3xl tracking-wide sm:text-4xl"
                  : "mt-1 text-xl tracking-wide",
            )}
          >
            {sponsor.name}
          </h3>
        </div>
      </div>
    </article>
  );
}

function TierHead({
  tierId,
  showCopy = true,
}: {
  tierId: SponsorTierId;
  showCopy?: boolean;
}) {
  const tier = sponsorTiers.find((item) => item.id === tierId);
  if (!tier) return null;

  return (
    <div>
      {showCopy ? (
        <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
          {tier.kicker}
        </p>
      ) : null}
      <h3
        className={cn(
          "font-heading tracking-wide text-white uppercase sm:text-3xl",
          showCopy ? "mt-1 text-2xl" : "text-2xl",
        )}
      >
        {tier.label}
      </h3>
      {showCopy ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          {tier.blurb}
        </p>
      ) : null}
    </div>
  );
}

function TierBlock({
  tierId,
  featured = false,
  compact = false,
  showCopy = true,
  columns,
}: {
  tierId: SponsorTierId;
  featured?: boolean;
  compact?: boolean;
  showCopy?: boolean;
  columns: string;
}) {
  const list = sponsorsByTier(tierId);
  if (list.length === 0) return null;

  return (
    <div>
      <TierHead tierId={tierId} showCopy={showCopy} />
      <div className={cn("mt-4 grid gap-3", columns)}>
        {list.map((sponsor) => (
          <SponsorTile
            key={sponsor.id}
            sponsor={sponsor}
            featured={featured}
            compact={compact}
          />
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

          <TierBlock
            tierId="cycle"
            featured
            showCopy={false}
            columns="grid-cols-1"
          />
          <TierBlock
            tierId="grand-slam"
            featured
            compact
            showCopy={false}
            columns="md:grid-cols-3"
          />
          <TierBlock
            tierId="signature"
            featured
            columns="md:grid-cols-3"
          />
        </div>
      </section>

      <TierBlock
        tierId="home-run"
        columns="sm:grid-cols-2 lg:grid-cols-3"
      />
      <TierBlock tierId="triple" columns="md:grid-cols-2" />

      <section
        id="sponsorship-packet"
        className="overflow-hidden rounded-2xl border border-white/10 bg-black"
      >
        <div className="flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
              2026–27 season
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-wide text-white uppercase sm:text-4xl">
              Put your name on Miller Field
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Packages from Single through Foul Ball, plus the form YHRC uses
              for artwork and payment. Open the packet, fill it in, and send
              it to the club.
            </p>
            <a
              href={`mailto:${program.email}?subject=${encodeURIComponent("Yukon Baseball sponsorship")}`}
              className="mt-4 inline-block text-sm text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              Email {program.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/images/packet-heading-logo.png"
              alt="Yukon Millers"
              width={239}
              height={243}
              sizes="56px"
              className="size-12 shrink-0 sm:size-14"
            />
            <a
              href={sponsorshipForm.href}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants(), "h-11 px-5 uppercase")}
            >
              Open the packet
            </a>
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
              <div>
                {sponsor.kicker ? (
                  <p className="text-[0.58rem] font-semibold tracking-[0.18em] text-red-400 uppercase">
                    {sponsor.kicker}
                  </p>
                ) : null}
                <p className="font-heading text-sm leading-tight tracking-wide text-white uppercase">
                  {sponsor.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
