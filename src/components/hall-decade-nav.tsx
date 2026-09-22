"use client";

import { cn } from "@/lib/utils";

export function HallDecadeNav({
  decades,
  active,
  onChange,
}: {
  decades: string[];
  active: string;
  onChange: (decade: string) => void;
}) {
  const items = ["All", ...decades];

  return (
    <nav aria-label="All-State decades" className="border-t border-[#d4b56a]/14">
      <div className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((decade) => {
          const selected = decade === active;

          return (
            <button
              key={decade}
              type="button"
              onClick={() => onChange(decade)}
              className={cn(
                "inline-flex h-8 shrink-0 items-center rounded-full border px-3",
                "font-heading text-xs tracking-[0.14em] uppercase",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b56a]/70",
                selected
                  ? "border-[#d4b56a]/70 bg-[#1c1812] text-white"
                  : "border-[#d4b56a]/25 bg-black/50 text-[#e8d5a3] hover:border-[#d4b56a]/55",
              )}
            >
              {decade}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
