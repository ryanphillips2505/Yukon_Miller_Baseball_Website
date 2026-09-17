export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-live="polite">
      <p className="text-[0.7rem] tracking-[0.22em] text-red-400 uppercase">
        Loading
      </p>
      <div className="mt-4 h-10 w-48 animate-pulse rounded-lg bg-white/8" />
      <div className="mt-6 space-y-3">
        <div className="h-24 animate-pulse rounded-2xl bg-white/6" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/6" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/6" />
      </div>
    </div>
  );
}
