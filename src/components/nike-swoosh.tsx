import { cn } from "@/lib/utils";

const sizes = {
  sm: { width: 72, height: 26 },
  md: { width: 104, height: 37 },
  lg: { width: 140, height: 50 },
} as const;

type NikeSwooshProps = {
  className?: string;
  size?: keyof typeof sizes;
};

export function NikeSwoosh({ className, size = "md" }: NikeSwooshProps) {
  const { width, height } = sizes[size];

  return (
    // Static SVG via img so the optimizer cannot flatten the mark.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/nike-swoosh.svg"
      alt="Nike"
      width={width}
      height={height}
      className={cn("block shrink-0", className)}
      style={{ width, height }}
    />
  );
}
