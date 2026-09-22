import type { ArticleBlock } from "@/lib/news-blocks";

export const joeLytleStory = {
  slug: "joe-lytle-banana-ball-all-star",
  title: "Yukon’s Joe Lytle Earns First Banana Ball All-Star Selection",
  date: "September 22, 2026",
  category: "News" as const,
  excerpt:
    "The former Yukon Miller and Oklahoma City University standout earns his first Banana Ball All-Star selection with the Indianapolis Clowns.",
  image: {
    src: "/images/news/joe-lytle-banana-ball-all-star.jpg",
    alt: "Joe Lytle in an Indianapolis Clowns uniform for his first Banana Ball All-Star selection",
    width: 800,
    height: 1000,
    focus: "50% 22%",
    size: "half" as const,
  },
  body: [
    "From Yukon to professional baseball, Joe Lytle continues to find new ways to make his mark on the game.",
  ],
  blocks: [
    {
      type: "p",
      text: "From Yukon to professional baseball, Joe Lytle continues to find new ways to make his mark on the game.",
    },
    {
      type: "p",
      text: "The former Yukon Miller and Oklahoma City University standout is adding another accomplishment to his baseball career after earning his first Banana Ball All-Star selection during the 2026 season.",
    },
    {
      type: "p",
      text: "Lytle is currently playing catcher for the Indianapolis Clowns, one of the teams competing on the Banana Ball World Tour. The 2026 season has been another productive one for the Yukon native, who has continued to combine his love for baseball with the entertainment and fan interaction that have made Banana Ball a growing phenomenon.",
    },
    {
      type: "p",
      text: "Through September 20, Lytle has recorded 54 hits and 37 RBIs while batting .362, with a .998 OPS for the Clowns.",
    },
    {
      type: "h2",
      text: "A Career That Has Taken Him Everywhere",
    },
    {
      type: "p",
      text: "Lytle's baseball journey began at Yukon High School, where he helped the Millers reach a regional title game while winning district and conference championships.",
    },
    {
      type: "p",
      text: "He continued his career at Oklahoma City University, playing for his father, Keith Lytle. Joe became one of the most productive hitters in OCU history, finishing his career with 350 hits, 214 RBIs and a .386 batting average. He was a four-time All-Sooner Athletic Conference selection and helped the Stars make two trips to the NAIA World Series.",
    },
    {
      type: "p",
      text: "Lytle went on to play professional independent baseball before joining Banana Ball in 2023. His first Banana Ball season came with the Party Animals, and he later joined the Firefighters before becoming part of the Indianapolis Clowns.",
    },
    {
      type: "p",
      text: "Now, more than a decade after his days wearing the Yukon uniform, Lytle is still playing the game he loves — and doing it on one of baseball's biggest entertainment stages.",
    },
    {
      type: "p",
      text: "Congratulations to Joe Lytle on earning his first Banana Ball All-Star selection!",
    },
    {
      type: "note",
      text: "Once a Miller, Always a Miller!",
    },
  ] satisfies ArticleBlock[],
};
