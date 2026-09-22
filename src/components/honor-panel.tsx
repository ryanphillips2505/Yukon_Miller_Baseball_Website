import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function HonorPanel({
  id,
  kicker,
  title,
  meta,
  featured = false,
  toolbar,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  meta?: string;
  featured?: boolean;
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-[28rem] flex-col overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_rgba(0,0,0,0.5)]",
        featured
          ? "border-2 border-[#d4b56a]/80"
          : "border border-[#d4b56a]/25",
        "lg:h-[44rem]",
      )}
    >
      <header
        className={cn(
          "relative shrink-0 overflow-hidden border-b",
          featured
            ? "border-[#d4b56a]/30 bg-[linear-gradient(180deg,#2e1e0f_0%,#0a0907_100%)]"
            : "border-[#d4b56a]/16 bg-[linear-gradient(180deg,#22180e_0%,#070708_100%)]",
        )}
      >
        {featured ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8a0f22] via-[#c8102e] to-[#8a0f22]"
            aria-hidden
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.16),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3] to-transparent"
          aria-hidden
        />
        <div className="relative px-4 py-4">
          <p className="text-[0.58rem] font-semibold tracking-[0.32em] text-[#d4b56a] uppercase">
            {kicker}
          </p>
          <h2 className="font-heading mt-1.5 text-3xl leading-none tracking-wide text-white uppercase">
            {title}
          </h2>
          {meta ? (
            <p className="mt-2 text-[0.68rem] font-semibold tracking-[0.16em] text-[#e8d5a3] uppercase">
              {meta}
            </p>
          ) : null}
        </div>
        {toolbar}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  );
}
