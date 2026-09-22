import type { ArticleBlock } from "@/lib/news-blocks";

export const seniors2026Story = {
  slug: "2026-seniors-next-level",
  title: "2026 Seniors Move On to Play at the Next Level",
  date: "Class of 2026",
  category: "News" as const,
  excerpt:
    "The next chapter is underway for five more Yukon Millers: Eddie Fish, Brayden Trogdon, Devon Butler, Cayden Thomas and Gentry Hoke.",
  image: {
    src: "/images/news/eddie-fish-louisiana-tech-hero.jpg",
    alt: "Eddie Fish in a Louisiana Tech uniform, holding a glove",
    width: 800,
    height: 533,
    focus: "48% 22%",
    size: "half" as const,
    hero: false,
  },
  body: [
    "The next chapter is underway for five more Yukon Millers: Eddie Fish, Brayden Trogdon, Devon Butler, Cayden Thomas and Gentry Hoke.",
  ],
  blocks: [
    {
      type: "p",
      text: "The next chapter is underway for five more Yukon Millers: Eddie Fish, Brayden Trogdon, Devon Butler, Cayden Thomas and Gentry Hoke.",
    },
    {
      type: "p",
      text: "These former Millers are taking the next step in their baseball journeys, continuing their careers at the collegiate level.",
    },
    {
      type: "people",
      items: [
        {
          title: "Eddie Fish — Louisiana Tech",
          image: {
            src: "/images/news/eddie-fish-louisiana-tech.jpg",
            alt: "Eddie Fish in a Louisiana Tech uniform, holding a glove",
            width: 382,
            height: 720,
          },
          paragraphs: [
            "Fish is beginning his career at Louisiana Tech University, where he will continue as an infielder for the Bulldogs.",
            "A talented and versatile player during his time at Yukon, Fish was a key contributor for the Millers and earned the opportunity to continue his career at the Division I level.",
          ],
        },
        {
          title: "Brayden Trogdon — Youngstown State",
          image: {
            src: "/images/news/brayden-trogdon-youngstown.jpg",
            alt: "Brayden Trogdon in a Youngstown State uniform, holding a glove in front of his face",
            width: 720,
            height: 640,
          },
          paragraphs: [
            "Trogdon is beginning his college career at Youngstown State University, joining the Penguins pitching staff.",
            "A dependable arm for the Millers, Trogdon developed into an important part of the Yukon pitching staff and now gets the opportunity to continue that development at the Division I level.",
          ],
        },
        {
          title: "Devon Butler — USAO",
          image: {
            src: "/images/news/devon-butler-usao.jpg",
            alt: "Devon Butler commitment graphic for the University of Science and Arts of Oklahoma",
            width: 550,
            height: 640,
          },
          paragraphs: [
            "Butler is continuing his baseball career at the University of Science and Arts of Oklahoma, joining the Drovers.",
            "Butler was a member of the Yukon Millers and is now taking his talents to the collegiate level as he begins the next chapter of his baseball career.",
          ],
        },
        {
          title: "Cayden Thomas — USAO",
          paragraphs: [
            "Thomas is also continuing his baseball career at the University of Science and Arts of Oklahoma, joining Butler with the Drovers.",
            "After his time with the Yukon Millers, Thomas will continue developing his game and competing at the collegiate level.",
          ],
        },
        {
          title: "Gentry Hoke — Cowley",
          image: {
            src: "/images/news/gentry-hoke-cowley.jpg",
            alt: "Gentry Hoke commitment graphic for Cowley College",
            width: 480,
            height: 640,
          },
          paragraphs: [
            "Hoke will continue his baseball career at Cowley College, where he will join the Tigers.",
            "A standout player for Yukon, Hoke earned the opportunity to continue developing his game and compete at the collegiate level.",
          ],
          note: "Hoke is taking a gap year due to injury and plans to continue his baseball career at Cowley College.",
        },
      ],
    },
    {
      type: "h2",
      text: "Once a Miller, Always a Miller",
    },
    {
      type: "p",
      text: "Five more Millers are now beginning the next chapter of their baseball journeys. Yukon Baseball is proud of the work Eddie, Brayden, Devon, Cayden and Gentry put in wearing the Yukon uniform and looks forward to following their journeys at the next level.",
    },
    {
      type: "p",
      text: "Congratulations, Eddie, Brayden, Devon, Cayden and Gentry! Go make your mark.",
    },
  ] satisfies ArticleBlock[],
};
