import type { ArticleBlock } from "@/lib/news-blocks";

export const gunnerFletcherStory = {
  slug: "gunner-fletcher-southwestern-christian",
  title: "Gunner Fletcher commits to Southwestern Christian University",
  date: "October 4, 2026",
  category: "Commit" as const,
  excerpt:
    "The 2027 left-hander will continue his academic and baseball career with the Eagles, coming off the 2026 NCCAA World Series title.",
  image: {
    src: "/images/news/gunner-fletcher-southwestern-christian.jpg",
    alt: "Gunner Fletcher commitment graphic for Southwestern Christian University baseball",
    width: 900,
    height: 900,
    focus: "48% 32%",
    size: "feature" as const,
    banner: {
      src: "/images/news/gunner-fletcher-southwestern-christian-banner.jpg",
      width: 1600,
      height: 680,
      focus: "48% 40%",
    },
    card: {
      src: "/images/news/gunner-fletcher-southwestern-christian-card.jpg",
      width: 800,
      height: 640,
      focus: "48% 38%",
    },
  },
  body: [
    "Congratulations to 2027 LHP Gunner Fletcher on his commitment to Southwestern Christian University to continue his academic and baseball career at the next level!",
  ],
  blocks: [
    {
      type: "p",
      text: "Congratulations to 2027 LHP Gunner Fletcher on his commitment to Southwestern Christian University to continue his academic and baseball career at the next level!",
    },
    {
      type: "p",
      text: "Gunner will be joining an Eagles program coming off the 2026 NCCAA World Series National Championship — the program’s second national title in three seasons.",
    },
    {
      type: "p",
      text: "Congratulations, Gunner! We’re proud of you and excited to see you represent Yukon Baseball at the next level!",
    },
  ] satisfies ArticleBlock[],
};
