import { cn } from "@/lib/utils";

const sizes = {
  header: { width: 48, height: 17 },
  sm: { width: 56, height: 20 },
  md: { width: 80, height: 28 },
  lg: { width: 108, height: 38 },
} as const;

type NikeSwooshProps = {
  className?: string;
  size?: keyof typeof sizes;
};

export function NikeSwoosh({ className, size = "md" }: NikeSwooshProps) {
  const { width, height } = sizes[size];

  return (
    // PNG via img so the mark cannot be cropped into a sliver.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/nike-swoosh.png"
      alt="Nike"
      width={width}
      height={height}
      className={cn("block shrink-0 object-contain", className)}
      style={{ width, height }}
    />
  );
}
