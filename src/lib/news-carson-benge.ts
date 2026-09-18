import type { ArticleBlock } from "@/lib/news-blocks";

export const carsonBengeStory = {
  slug: "from-yukon-to-the-big-leagues",
  title: "From Yukon to the big leagues",
  date: "March 26, 2026",
  category: "News" as const,
  excerpt:
    "Carson Benge’s path from Yukon High School to Opening Day with the New York Mets.",
  image: {
    src: "/images/news/carson-benge-at-bat.jpg",
    alt: "Carson Benge batting in a New York Mets home uniform at Citi Field",
    width: 2400,
    height: 800,
  },
  body: [
    "Before he wore a New York Mets uniform at Citi Field, Carson Benge wore Yukon.",
  ],
  blocks: [
    {
      type: "p",
      text: "Before he wore a New York Mets uniform at Citi Field, Carson Benge wore Yukon. He played on Miller Field, represented the high school, and helped set the standard the program still plays to. Now he is on the biggest stage in the game.",
    },
    {
      type: "h2",
      text: "A Yukon Miller",
    },
    {
      type: "p",
      text: "Benge became one of the top two-way players in Oklahoma. His senior season in 2021 was the one people still quote: .490 at the plate, 8–1 with 124 strikeouts on the mound. Yukon reached the Class 6A state tournament. He was named OCABCA North Player of the Year and COAC Offensive Player of the Year.",
    },
    {
      type: "p",
      text: "He could hit, pitch, defend, and run — and he competed. That combination took him to Oklahoma State.",
    },
    {
      type: "h2",
      text: "Oklahoma State",
    },
    {
      type: "p",
      text: "The college career did not start the way he planned. Tommy John surgery cost him the 2022 season. He came back as a redshirt freshman in 2023 and hit .345 with seven home runs, 43 RBI, and 17 doubles, while pitching again. Freshman All-America. First Team All-Big 12.",
    },
    {
      type: "p",
      text: "In 2024 he hit .335 / .444 / .665 with 18 home runs and 64 RBI. On the mound he posted a 3.16 ERA with 44 strikeouts and 11 walks. By July he was one of the top prospects in the country.",
    },
    {
      type: "h2",
      text: "First round, No. 19",
    },
    {
      type: "p",
      text: "On July 14, 2024, the New York Mets took Benge with the 19th pick in the first round. A player who had worn Yukon was a first-round Major League Baseball draft choice. He signed later that month and went to work.",
    },
    {
      type: "h2",
      text: "Through the system",
    },
    {
      type: "p",
      text: "He did not stay long at any one stop. In 2025 he played for High-A Brooklyn, Double-A Binghamton, and Triple-A Syracuse. Across 116 games he hit .281 / .385 / .472 with 15 home runs, 25 doubles, seven triples, 73 RBI, 87 runs, 22 stolen bases, and an .857 OPS.",
    },
    {
      type: "p",
      text: "The Mets named him 2025 Organizational Player of the Year. He played in the MLB All-Star Futures Game. By the start of 2026, MLB Pipeline ranked him the No. 16 prospect in baseball.",
    },
    {
      type: "gallery",
      photos: [
        {
          src: "/images/news/carson-benge-citifield.jpg",
          alt: "Carson Benge looking up after a play in a New York Mets road uniform",
          caption: "In a Mets road uniform",
          width: 333,
          height: 266,
        },
        {
          src: "/images/news/carson-benge-new-york.jpg",
          alt: "Carson Benge walking in a New York Mets road jersey with NEW YORK across the chest",
          caption: "No. 3, New York",
          width: 333,
          height: 266,
        },
      ],
    },
    {
      type: "h2",
      text: "Opening Day",
    },
    {
      type: "p",
      text: "Benge hit .366 / .435 in 2026 spring training and made the Mets’ Opening Day roster on March 23. Two years after college baseball, a former Yukon Miller was a big-leaguer.",
    },
    {
      type: "p",
      text: "He debuted on Opening Day, March 26, 2026, at Citi Field. His first Major League hit was a home run — 385 feet, 105.3 mph exit velocity — and it earned a curtain call. He became the second player in Mets history to homer in an Opening Day debut, and the 17th Met whose first hit was a home run.",
    },
    {
      type: "h2",
      text: "Still a Miller",
    },
    {
      type: "p",
      text: "He played in this program. He wore Yukon across his chest. He practiced on this field and competed against the same schools our players see now. The big leagues can feel like another world to a high school player. Benge makes it real.",
    },
    {
      type: "table",
      caption: "Carson Benge at a glance",
      headers: ["", ""],
      rows: [
        ["Hometown", "Yukon, Oklahoma"],
        ["High school", "Yukon High School · 2021"],
        ["Senior season", ".490 · 8–1 · 124 strikeouts"],
        ["2021", "Class 6A state tournament"],
        ["College", "Oklahoma State"],
        ["Draft", "Mets · first round, No. 19 · 2024"],
        ["2025", "Mets Organizational Player of the Year · Futures Game"],
        ["MLB debut", "March 26, 2026 · Citi Field"],
        ["First hit", "Home run"],
      ],
    },
    {
      type: "p",
      text: "There is a lot of baseball left. Wherever it goes, he is part of Yukon Baseball. Before the first-round pick, before Citi Field, before the Mets — there was Yukon.",
    },
    {
      type: "note",
      text: "Once a Miller. Always a Miller.",
    },
  ] satisfies ArticleBlock[],
};
