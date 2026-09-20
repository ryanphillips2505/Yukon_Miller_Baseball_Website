import { articles } from "@/lib/news";
import { defaultOgImage, ogCoverImage, ogImageSize } from "@/lib/og-cover";

export const alt = "Yukon Miller Baseball news";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  const photo = articles.find((article) => article.image)?.image?.src;
  return ogCoverImage(photo ?? defaultOgImage);
}
