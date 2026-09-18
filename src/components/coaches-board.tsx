"use client";

import { CoachBioDialog } from "@/components/coach-bio-dialog";
import { PhotoSlot } from "@/components/photo-slot";
import { coaches, supportStaff, type Coach } from "@/lib/coaches";
import { useState } from "react";

function StaffCard({
  person,
  onOpen,
}: {
  person: Coach;
  onOpen?: (coach: Coach) => void;
}) {
  const card = (
    <>
      <PhotoSlot
        label="Staff photo coming"
        src={person.photo}
        alt={person.name}
        className="aspect-[4/5]"
      />
      <div className="p-5 text-left">
        <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
          {person.role}
        </p>
        <h2 className="font-heading mt-1 text-2xl tracking-wide text-white uppercase">
          {person.name}
        </h2>
      </div>
    </>
  );

  if (!onOpen) {
    return (
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        {card}
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      <button
        type="button"
        onClick={() => onOpen(person)}
        className="block w-full text-left transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.06] focus-visible:outline-none"
      >
        {card}
      </button>
    </article>
  );
}

export function CoachesBoard() {
  const [selected, setSelected] = useState<Coach | null>(null);

  return (
    <>
      <section>
        <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
          Coaching staff
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <StaffCard key={coach.id} person={coach} onOpen={setSelected} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
          Managers and students
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportStaff.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </div>
      </section>

      <CoachBioDialog
        coach={selected}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </>
  );
}
