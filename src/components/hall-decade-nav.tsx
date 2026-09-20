"use client";

import { cn } from "@/lib/utils";

export function HallDecadeNav({ decades }: { decades: string[] }) {
  return (
    <nav
      aria-label="All-State decades"
      className="sticky top-14 z-20 border-y border-[#d4b56a]/18 bg-black/80 backdrop-blur-md"
    >
      <div className="flex gap-2 overflow-x-auto px-3 py-2.5 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden">
        {decades.map((decade) => (
          <a
            key={decade}
            href={`#decade-${decade}`}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full border border-[#d4b56a]/30 bg-black/60 px-4",
              "font-heading text-sm tracking-[0.16em] text-[#e8d5a3] uppercase",
              "transition-colors hover:border-[#d4b56a]/70 hover:bg-[#1c1812] hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70",
            )}
          >
            {decade}
          </a>
        ))}
      </div>
    </nav>
  );
}
