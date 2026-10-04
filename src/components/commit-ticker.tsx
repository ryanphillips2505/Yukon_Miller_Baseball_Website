import { commits, type Commit } from "@/lib/commits";
import Image from "next/image";
import Link from "next/link";

function storyHref(commit: Commit) {
  return commit.newsSlug ? `/news/${commit.newsSlug}` : "/recruiting";
}

function TickerItem({
  commit,
  hidden,
}: {
  commit: Commit;
  hidden?: boolean;
}) {
  return (
    <Link
      href={storyHref(commit)}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group flex shrink-0 items-center gap-3 border-r border-white/10 px-6 py-2.5 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.06] focus-visible:outline-none"
    >
      <span className="flex h-9 w-11 shrink-0 items-center justify-center rounded-md bg-[#f4f1ea] px-1.5">
        <Image
          src={commit.logo.src}
          alt=""
          width={commit.logo.width}
          height={commit.logo.height}
          className="h-6 w-auto max-w-full object-contain"
        />
      </span>
      <span className="flex items-baseline gap-2.5 whitespace-nowrap">
        <span className="font-heading text-[1.15rem] leading-none tracking-wide text-white uppercase group-hover:text-red-300">
          {commit.player}
        </span>
        <span className="text-[0.68rem] tracking-[0.14em] text-zinc-400 uppercase">
          commits to {commit.school}
        </span>
      </span>
    </Link>
  );
}

export function CommitTicker() {
  return (
    <div className="commit-ticker w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="flex min-h-14">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-transparent pr-3.5 pl-4 shadow-[inset_3px_0_0_#c8102e] sm:gap-2.5 sm:pr-4">
          <span className="commit-ticker-live size-1.5 shrink-0 rounded-full bg-[#c8102e]" />
          <span className="font-heading text-[0.72rem] leading-none tracking-[0.12em] whitespace-nowrap text-white uppercase sm:text-[0.84rem] sm:tracking-[0.14em]">
            Player spotlight
          </span>
        </div>
        <div className="commit-ticker-window relative min-w-0 flex-1">
          <div className="commit-ticker-track flex w-max">
            {commits.map((commit) => (
              <TickerItem key={commit.id} commit={commit} />
            ))}
            {commits.map((commit) => (
              <TickerItem key={`${commit.id}-loop`} commit={commit} hidden />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
