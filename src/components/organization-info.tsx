import { nonprofit } from "@/lib/nonprofit";
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

export function OrganizationInfo() {
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
        <Fact label="Official website">
          <a
            href={nonprofit.websiteUrl}
            className="break-all text-red-400 hover:text-red-300"
          >
            {nonprofit.websiteLabel}
          </a>
        </Fact>
      </div>
    </section>
  );
}
