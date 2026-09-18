import { cn } from "@/lib/utils";
import Image from "next/image";

type NikeSwooshProps = {
  className?: string;
};

export function NikeSwoosh({ className }: NikeSwooshProps) {
  return (
    <Image
      src="/images/nike-swoosh.png"
      alt="Nike"
      width={480}
      height={156}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
