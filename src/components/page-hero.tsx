type PageHeroProps = {
  kicker?: string;
  title: string;
  lede?: string;
};

export function PageHero({ kicker, title, lede }: PageHeroProps) {
  return (
    <header className="border-b border-white/8 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {kicker ? (
          <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-red-400 uppercase">
            {kicker}
          </p>
        ) : null}
        <h1 className="font-heading mt-2 text-4xl tracking-wide text-white uppercase sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
