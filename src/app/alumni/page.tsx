import { AllStateHall } from "@/components/all-state-hall";
import { AthleticsHallOfFame } from "@/components/athletics-hall-of-fame";
import { BrandLogo } from "@/components/brand-logo";
import { MillersDrafted } from "@/components/millers-drafted";
import { allStateHall } from "@/lib/all-state";
import { draftedBoard } from "@/lib/drafted";
import { hallOfFame } from "@/lib/hall-of-fame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall of Honor",
  description: `${hallOfFame.title}, ${draftedBoard.title}, and the Yukon Millers All-State wall. ${draftedBoard.count} signed MLB draft picks, ${allStateHall.count} All-State names.`,
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
        <div className="relative mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-center text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Yukon Miller Baseball
          </p>
          <h1 className="font-heading mt-3 text-center text-5xl leading-[0.84] tracking-wide text-white uppercase sm:text-6xl">
            Hall of Honor
          </h1>
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-4 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-3 lg:items-stretch">
        <AthleticsHallOfFame />
        <MillersDrafted />
        <AllStateHall />
      </div>
    </div>
  );
}
