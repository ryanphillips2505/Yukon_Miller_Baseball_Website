export type Article = {
  slug: string;
  title: string;
  date: string;
  category: "News" | "Commit" | "Update";
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "drake-pace-oral-roberts",
    title: "Drake Pace commits to Oral Roberts",
    date: "Program announcement",
    category: "Commit",
    excerpt:
      "Pace is headed to Oral Roberts University, the NCAA Division I Golden Eagles in Tulsa.",
    body: [
      "Yukon High School baseball announced that Drake Pace has committed to Oral Roberts University.",
      "ORU is Tulsa’s Division I club — a Summit League regular with a College World Series on the résumé, now playing at Chapman Park.",
    ],
  },
  {
    slug: "clayton-strange-hutchinson",
    title: "Clayton Strange commits to Hutchinson CC",
    date: "Posted on yukonbaseball.com",
    category: "Commit",
    excerpt:
      "Strange is the latest Miller to keep playing after high school, signing with Hutchinson Community College.",
    body: [
      "Yukon High School baseball announced that Clayton Strange has committed to Hutchinson Community College.",
      "The Blue Dragons just finished No. 22 in NJCAA Division I at 46-15 after a record 131-homer season — two years after a 51-win Jayhawk West title.",
    ],
  },
  {
    slug: "pryce-mcclure-barton",
    title: "Pryce McClure commits to Barton CC",
    date: "Program announcement",
    category: "Commit",
    excerpt:
      "McClure will play for the Barton Cougars, NJCAA Division I baseball in Great Bend, Kansas.",
    body: [
      "Yukon High School baseball announced that Pryce McClure has committed to Barton Community College.",
      "The Cougars just knocked off No. 2 Cloud County and reached the Plains District final four — NJCAA Division I baseball in Great Bend.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function latestArticles(limit = 3) {
  return articles.slice(0, limit);
}
