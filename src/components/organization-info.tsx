import { buttonVariants } from "@/components/ui/button";
import { nonprofit } from "@/lib/nonprofit";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Fact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-400 uppercase">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 whitespace-pre-line text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export function OrganizationInfo({
  variant,
}: {
  variant: "support" | "contact";
}) {
  const website = (
    <a
      href={nonprofit.websiteUrl}
      className="break-all text-red-400 hover:text-red-300"
    >
      {nonprofit.websiteLabel}
    </a>
  );

  if (variant === "contact") {
    return (
      <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
        <h2 className="font-heading text-xl tracking-wide text-white uppercase">
          Organization information
        </h2>
        <div className="mt-5 grid gap-5">
          <Fact label="Legal name">
            <span className="text-white">{nonprofit.legalName}</span>
            <span className="mt-1 block text-[0.65rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              {nonprofit.statusLine}
            </span>
          </Fact>
          <Fact label="EIN">{nonprofit.ein}</Fact>
          <Fact label="Mailing address">
            {nonprofit.mailingLines.join("\n")}
          </Fact>
          <Fact label="Official website">{website}</Fact>
          <Fact label="Email">
            <div className="flex flex-col items-start gap-3">
              <a
                href={`mailto:${nonprofit.email}`}
                className="break-all text-red-400 hover:text-red-300"
              >
                {nonprofit.email}
              </a>
              <a
                href={`mailto:${nonprofit.email}`}
                className={cn(buttonVariants(), "h-9 px-4 text-xs uppercase")}
              >
                Open email
              </a>
            </div>
          </Fact>
        </div>
        <p className="mt-5 text-sm leading-6 text-zinc-400">
          {nonprofit.contactBlurb}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
      <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
        Organization information
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Fact label="Legal name">
          <span className="text-white">{nonprofit.legalName}</span>
          <span className="mt-1 block text-[0.65rem] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            {nonprofit.statusLine}
          </span>
        </Fact>
        <Fact label="EIN">{nonprofit.ein}</Fact>
        <Fact label="Mailing address">{nonprofit.mailingLines.join("\n")}</Fact>
        <Fact label="Official website">{website}</Fact>
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">
        {nonprofit.officialSite}
      </p>
    </section>
  );
}
