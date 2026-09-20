import type { ArticleImage } from "@/lib/news";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ArticleCardImage({
  image,
  className,
}: {
  image: ArticleImage;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={cn("object-cover", className)}
      style={{ objectPosition: image.focus ?? "center 22%" }}
    />
  );
}
