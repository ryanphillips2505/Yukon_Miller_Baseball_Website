import { AllStateHall } from "@/components/all-state-hall";
import { AthleticsHallOfFame } from "@/components/athletics-hall-of-fame";
import { BrandLogo } from "@/components/brand-logo";
import { MillersDrafted } from "@/components/millers-drafted";
import { allStateHall } from "@/lib/all-state";
import { hallOfFame } from "@/lib/hall-of-fame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall of Honor",
  description: `${hallOfFame.title} and the Yukon Millers All-State wall. ${allStateHall.count} All-State names, ${allStateHall.span}.`,
};

export default function AlumniPage() {
  return (
    <div className="bg-[#070708]">
      <header className="relative overflow-hidden border-b border-[#d4b56a]/20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(200,16,46,0.2),transparent_40%),radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.16),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8d5a3] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center opacity-[0.07]"
          aria-hidden
        >
          <BrandLogo
            variant="state"
            sizes="(max-width: 768px) 80vw, 640px"
            alt=""
            className="h-auto w-[min(80vw,40rem)]"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-center text-[0.7rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Yukon Miller Baseball
          </p>
          <h1 className="font-heading mt-3 text-center text-5xl leading-[0.84] tracking-wide text-white uppercase sm:text-6xl lg:text-7xl">
            Hall of Honor
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-12">
        <AthleticsHallOfFame />
        <AllStateHall />
        <MillersDrafted />
      </div>
    </div>
  );
}
