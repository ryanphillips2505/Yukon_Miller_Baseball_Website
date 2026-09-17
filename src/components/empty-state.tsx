import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type EmptyStateProps = {
  kicker?: string;
  title: string;
  body: string;
  action?: { href: string; label: string };
  className?: string;
};

export function EmptyState({
  kicker = "Coming soon",
  title,
  body,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-white/15 bg-white/3 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-red-400 uppercase">
        {kicker}
      </p>
      <h3 className="font-heading mt-3 text-2xl tracking-wide text-white uppercase">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-400">
        {body}
      </p>
      {action ? (
        <Link
          href={action.href}
          className={cn(buttonVariants({ variant: "default" }), "mt-6 h-10 px-4")}
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
