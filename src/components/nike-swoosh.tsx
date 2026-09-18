import { cn } from "@/lib/utils";

type NikeSwooshProps = {
  className?: string;
};

export function NikeSwoosh({ className }: NikeSwooshProps) {
  return (
    <svg
      viewBox="0 7.6 24 8"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Nike"
    >
      <path
        fill="currentColor"
        d="M24 7.8 6.442 15.276c-1.156.532-2.347.574-3.447 0C1.156 14.209 0 12.951 0 12.951s.428.075 1.134.075c1.388 0 3.244-.332 5.308-1.241L24 7.8z"
      />
    </svg>
  );
}
