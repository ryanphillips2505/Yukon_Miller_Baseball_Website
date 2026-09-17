import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { players } from "@/lib/roster";
import { teams } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roster" };

export default function RosterPage() {
  return (
    <div>
      <PageHero
        kicker="Players"
        title="Roster"
        lede="Names, numbers, and classes post after tryouts. Player photos stay empty until the program supplies them."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        {teams.map((team) => {
          const squad = players.filter((player) => player.team === team.id);
          return (
            <section key={team.id}>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h2 className="font-heading text-2xl tracking-wide text-white uppercase">
                    {team.label}
                  </h2>
                  <p className="text-sm text-zinc-500">{team.field}</p>
                </div>
                <p className="text-xs tracking-wide text-zinc-600 uppercase">
                  {squad.length} players
                </p>
              </div>
              {squad.length === 0 ? (
                <EmptyState
                  kicker="Awaiting tryouts"
                  title={`${team.label} roster is not posted`}
                  body="When the staff publishes this team, each player gets a card with number and class year. Photos are optional and will never be faked."
                />
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {squad.map((player) => (
                    <li
                      key={player.id}
                      className="rounded-2xl border border-white/10 bg-zinc-950 p-4"
                    >
                      <p className="font-heading text-lg tracking-wide text-white uppercase">
                        {player.number ? `#${player.number} ` : ""}
                        {player.name}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {[player.classYear, player.positions?.join(" / ")]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
