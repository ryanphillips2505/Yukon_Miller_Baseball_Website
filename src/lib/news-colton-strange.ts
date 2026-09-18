import type { ArticleBlock } from "@/lib/news-blocks";

export const coltonStrangeStory = {
  slug: "from-yukon-to-a-national-championship",
  title: "From Yukon to a national championship",
  date: "2026 NJCAA D-II World Series",
  category: "News" as const,
  excerpt:
    "Former Miller Colton Strange helps Pearl River capture the 2026 NJCAA Division II World Series.",
  image: {
    src: "/images/news/colton-strange-pearl-river.jpg",
    alt: "Colton Strange holding the 2026 NJCAA Division II national championship plaque in Enid",
    width: 768,
    height: 1024,
  },
  body: [
    "Another former Yukon Miller has added a championship to his baseball journey.",
  ],
  blocks: [
    {
      type: "p",
      text: "Another former Yukon Miller has added a championship to his baseball journey.",
    },
    {
      type: "p",
      text: "Colton Strange, a Yukon High School graduate and former member of this program, was part of the 2026 Pearl River Community College team that captured the NJCAA Division II Baseball National Championship in Enid, Oklahoma.",
    },
    {
      type: "p",
      text: "For Yukon Baseball, that makes the accomplishment even more special. He grew up here, played his high school baseball here, and kept going.",
    },
    {
      type: "h2",
      text: "Pearl River",
    },
    {
      type: "p",
      text: "After beginning his college career at Cloud County Community College, Strange joined one of the top junior-college programs in the country at Pearl River.",
    },
    {
      type: "p",
      text: "He made an impact in the championship season. In 24 games he hit .333 with a .435 on-base percentage and a .500 slugging percentage — 12 hits, three doubles, a home run, 10 RBI, and 14 runs scored.",
    },
    {
      type: "h2",
      text: "The World Series",
    },
    {
      type: "p",
      text: "Pearl River entered the 2026 NJCAA Division II World Series after finishing as the national runner-up one year earlier. This time the Wildcats finished the job.",
    },
    {
      type: "p",
      text: "They advanced through the bracket and defeated South Mountain Community College 4–3 in 11 innings in the national championship game at David Allen Memorial Ballpark in Enid. The win gave Pearl River its second NJCAA Division II national championship, joining the 2022 title.",
    },
    {
      type: "p",
      text: "For Colton, it meant celebrating a national championship back in his home state.",
    },
    {
      type: "h2",
      text: "Still a Miller",
    },
    {
      type: "p",
      text: "Every player’s path after Yukon looks different. Colton’s journey is another example of what can happen when players keep working, competing, and taking the next opportunity in front of them.",
    },
    {
      type: "p",
      text: "From Yukon High School to Pearl River. From a Miller to a national champion.",
    },
    {
      type: "table",
      caption: "Colton Strange at a glance",
      headers: ["", ""],
      rows: [
        ["Hometown", "Yukon, Oklahoma"],
        ["High school", "Yukon High School · 2023"],
        ["College", "Cloud County · Pearl River"],
        ["2026 season", ".333 / .435 / .500 · 24 games"],
        ["Championship", "Pearl River 4–3, 11 innings · South Mountain"],
        ["Site", "David Allen Memorial Ballpark · Enid"],
        ["Program titles", "Pearl River · 2022, 2026"],
      ],
    },
    {
      type: "p",
      text: "Congratulations, Colton.",
    },
    {
      type: "note",
      text: "Once a Miller. Always a Miller.",
    },
  ] satisfies ArticleBlock[],
};
