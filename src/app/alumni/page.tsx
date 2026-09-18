import { AllStateHall } from "@/components/all-state-hall";
import { MillersDrafted } from "@/components/millers-drafted";
import { allStateHall } from "@/lib/all-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All-State",
  description: `Yukon Millers All-State wall. ${allStateHall.count} names, ${allStateHall.span}.`,
};

export default function AlumniPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      <AllStateHall />
      <MillersDrafted />
    </div>
  );
}
