import { cn } from "@/lib/utils";

const sizes = {
  header: { width: 62, height: 22 },
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
