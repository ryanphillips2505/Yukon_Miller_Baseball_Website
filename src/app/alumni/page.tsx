import { AllStateHall } from "@/components/all-state-hall";
import { allStateHall } from "@/lib/all-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All-State",
  description:
    "Yukon Millers All-State wall. Every Miller named All-State, from the first class to the latest.",
};

export default function AlumniPage() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-[#d4b56a]/16 bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4b56a]/70 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[#d4b56a] uppercase">
            Alumni
          </p>
          <h1 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-6xl">
            The Wall
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Yukon Millers All-State. {allStateHall.count} names.{" "}
            {allStateHall.span}. This is the program hall.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AllStateHall />
      </div>
    </div>
  );
}
