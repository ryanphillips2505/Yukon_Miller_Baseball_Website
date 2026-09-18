export function MillersDrafted() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#d4b56a]/22 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <header className="relative overflow-hidden bg-[linear-gradient(180deg,#1c140c_0%,#070708_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,181,106,0.16),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
        <div className="relative px-5 py-10 text-center sm:px-8 sm:py-12">
          <p className="text-[0.68rem] font-semibold tracking-[0.42em] text-[#d4b56a] uppercase">
            Coming soon
          </p>
          <h2 className="font-heading mt-3 text-4xl leading-[0.86] tracking-wide text-white uppercase sm:text-5xl lg:text-6xl">
            Millers Drafted
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-400">
            The draft wall is next. Names go up when the program has the
            official list.
          </p>
        </div>
      </header>
    </section>
  );
}
