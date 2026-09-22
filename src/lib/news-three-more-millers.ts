import type { ArticleBlock } from "@/lib/news-blocks";

export const threeMoreMillersStory = {
  slug: "three-more-millers-next-level",
  title: "Three More Millers Continue to the Next Level",
  date: "Summer 2026",
  category: "News" as const,
  excerpt:
    "Three former Yukon Millers took the next step in their baseball careers this summer, with Grady Hoke, Luke Graham and Caden Janvrin continuing their journeys at four-year universities.",
  image: {
    src: "/images/news/grady-hoke-kansas-hero.jpg",
    alt: "Grady Hoke in a Kansas uniform, holding a glove with a baseball in the air",
    width: 659,
    height: 534,
    focus: "52% 28%",
    size: "half" as const,
    hero: false,
  },
  body: [
    "Three former Yukon Millers took the next step in their baseball careers this summer, with Grady Hoke, Luke Graham and Caden Janvrin continuing their journeys at four-year universities.",
  ],
  blocks: [
    {
      type: "p",
      text: "Three former Yukon Millers took the next step in their baseball careers this summer, with Grady Hoke, Luke Graham and Caden Janvrin continuing their journeys at four-year universities.",
    },
    {
      type: "people",
      items: [
        {
          title: "Grady Hoke — Kansas",
          image: {
            src: "/images/news/grady-hoke-kansas.jpg",
            alt: "Grady Hoke in a Kansas uniform, holding a glove with a baseball in the air",
            width: 437,
            height: 640,
          },
          paragraphs: [
            "Grady Hoke continued his career at the University of Kansas after spending his freshman season at Cowley College. Hoke went 8-5 with a 4.21 ERA in 2026, recording 70 strikeouts in 62 innings over 15 appearances.",
          ],
        },
        {
          title: "Luke Graham — Eastern Kentucky",
          image: {
            src: "/images/news/luke-graham-eku.jpg",
            alt: "Luke Graham listed on the 2027 Eastern Kentucky baseball roster",
            width: 588,
            height: 550,
          },
          paragraphs: [
            "Luke Graham joined Eastern Kentucky University after two seasons of junior college baseball, most recently at Walters State Community College. Graham hit .279 with 11 home runs, 37 RBI, 56 runs scored and 11 stolen bases in 2026, finishing the season with a 1.005 OPS. He also competed in the NJCAA Division I National Championship Tournament in back-to-back seasons, first with Eastern Oklahoma State and then with Walters State.",
          ],
        },
        {
          title: "Caden Janvrin — Southeastern Oklahoma State",
          image: {
            src: "/images/news/caden-janvrin-southeastern.jpg",
            alt: "Caden Janvrin in a Southeastern Oklahoma State Savage Storm uniform",
            width: 374,
            height: 560,
          },
          paragraphs: [
            "Caden Janvrin will continue his baseball career at Southeastern Oklahoma State University after playing at Rose State College. Janvrin will compete at the NCAA Division II level for the Savage Storm.",
          ],
        },
      ],
    },
    {
      type: "p",
      text: "All three players have earned the opportunity to continue their baseball careers at four-year schools, adding another chapter to their journeys that began in Yukon.",
    },
    {
      type: "p",
      text: "Congratulations, Grady, Luke and Caden! Yukon Baseball is proud of you and excited to follow your careers at the next level.",
    },
  ] satisfies ArticleBlock[],
};
