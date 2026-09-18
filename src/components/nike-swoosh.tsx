import { cn } from "@/lib/utils";

const SWOOSH =
  "M24 7.8 6.442 15.276c-1.156.532-2.347.574-3.447 0C1.156 14.209 0 12.951 0 12.951s.428.075 1.134.075c1.388 0 3.244-.332 5.308-1.241L24 7.8z";

const sizes = {
  sm: { width: 44, height: 14 },
  md: { width: 56, height: 18 },
  lg: { width: 72, height: 23 },
} as const;

type NikeSwooshProps = {
  className?: string;
  size?: keyof typeof sizes;
};

export function NikeSwoosh({ className, size = "md" }: NikeSwooshProps) {
  const { width, height } = sizes[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.4 7.5 24.8 8.1"
      width={width}
      height={height}
      role="img"
      aria-label="Nike"
      className={cn("block shrink-0 text-white", className)}
      style={{ width, height }}
    >
      <path fill="currentColor" d={SWOOSH} />
    </svg>
  );
}
