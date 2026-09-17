import { displayName, players, rosterGroups } from "@/lib/roster";

export function RosterBoard() {
  const groups = rosterGroups();

  return (
    <section className="overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <header className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#1a0a0d_0%,#0a0a0c_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,16,46,0.28),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
        <div className="relative flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-red-400 uppercase">
              Yukon Miller Baseball
            </p>
            <h2 className="font-heading mt-2 text-4xl leading-none tracking-wide text-white uppercase sm:text-5xl">
              Program Roster
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              Alphabetical. No numbers. Bats and throws as posted by the
              program.
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl leading-none text-white">
              {String(players.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase">
              Players
            </p>
          </div>
        </div>
        <div className="relative hidden grid-cols-[minmax(0,1fr)_4rem_4.5rem] gap-4 border-t border-white/8 px-7 py-2 text-[0.62rem] tracking-[0.2em] text-zinc-500 uppercase sm:grid">
          <span>Player</span>
          <span className="text-center">Bats</span>
          <span className="text-center">Throws</span>
        </div>
      </header>

      <div>
        {groups.map(([letter, squad]) => (
          <section key={letter} className="border-b border-white/8 last:border-b-0">
            <div className="bg-zinc-950/80 px-5 py-2 sm:px-7">
              <p className="font-heading text-lg tracking-[0.2em] text-red-400">
                {letter}
              </p>
            </div>
            <ul>
              {squad.map((player) => (
                <li
                  key={player.id}
                  className="grid grid-cols-[minmax(0,1fr)_2.25rem_2.75rem] items-center gap-3 px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_4rem_4.5rem] sm:gap-4 sm:px-7 even:bg-white/[0.02]"
                >
                  <p className="min-w-0 font-heading text-xl tracking-wide text-white uppercase">
                    {displayName(player)}
                  </p>
                  <p className="text-center font-heading text-lg text-zinc-200">
                    <span className="mr-1 text-[0.6rem] tracking-[0.16em] text-zinc-500 uppercase sm:hidden">
                      B
                    </span>
                    {player.bats}
                  </p>
                  <p className="text-center font-heading text-lg text-zinc-200">
                    <span className="mr-1 text-[0.6rem] tracking-[0.16em] text-zinc-500 uppercase sm:hidden">
                      T
                    </span>
                    {player.throws}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
