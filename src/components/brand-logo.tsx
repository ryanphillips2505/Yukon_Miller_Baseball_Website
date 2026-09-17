import { brand } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandLogoProps = {
  variant?: "primary" | "mark";
  priority?: boolean;
  className?: string;
  sizes?: string;
  alt?: string;
};

export function BrandLogo({
  variant = "primary",
  priority = false,
  className,
  sizes,
  alt,
}: BrandLogoProps) {
  const asset = brand[variant];

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
        className={cn("h-auto max-w-full", className)}
    />
  );
}
