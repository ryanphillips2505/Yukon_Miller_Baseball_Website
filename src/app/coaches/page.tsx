import { PageHero } from "@/components/page-hero";
import { PhotoSlot } from "@/components/photo-slot";
import { coaches, supportStaff } from "@/lib/coaches";
import { program } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Coaches" };

function StaffCard({
  name,
  role,
  photo,
}: {
  name: string;
  role: string;
  photo?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      <PhotoSlot
        label="Staff photo coming"
        src={photo}
        alt={name}
        className="aspect-[4/5]"
      />
      <div className="p-5">
        <p className="text-[0.65rem] tracking-[0.18em] text-red-400 uppercase">
          {role}
        </p>
        <h2 className="font-heading mt-1 text-2xl tracking-wide text-white uppercase">
          {name}
        </h2>
      </div>
    </article>
  );
}

export default function CoachesPage() {
  return (
    <div>
      <PageHero
        kicker="Staff"
        title="Coaches"
        lede="The Yukon Miller staff as listed by the program — coaches, managers, and students. Headshots post when Ryan adds them."
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Coaching staff
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach) => (
              <StaffCard
                key={coach.id}
                name={coach.name}
                role={coach.role}
                photo={coach.photo}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
            Managers and students
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportStaff.map((person) => (
              <StaffCard
                key={person.id}
                name={person.name}
                role={person.role}
                photo={person.photo}
              />
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <p className="text-sm leading-6 text-zinc-400">
            College coaches and families can reach the staff at{" "}
            <a
              className="text-red-400 hover:text-red-300"
              href={`mailto:${program.email}`}
            >
              {program.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
