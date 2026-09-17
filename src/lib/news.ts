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
      "ORU plays NCAA Division I baseball in the Summit League at J.L. Johnson Stadium in Tulsa, Oklahoma. The Golden Eagles wear navy and Vegas gold.",
      "College decisions post here as players make them official. Families and college coaches can reach the staff at yukonmillerbaseball@gmail.com.",
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
      "The Blue Dragons play NJCAA Division I baseball in the Kansas Jayhawk Community College Conference at Hobart–Detter Field in Hutchinson, Kansas.",
      "College decisions post here as players make them official. Families and college coaches can reach the staff at yukonmillerbaseball@gmail.com.",
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
      "The Cougars play NJCAA Division I baseball in the Kansas Jayhawk Community College Conference at Lawson-Biggs Field in Great Bend, Kansas.",
      "College decisions post here as players make them official. Families and college coaches can reach the staff at yukonmillerbaseball@gmail.com.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function latestArticles(limit = 3) {
  return articles.slice(0, limit);
}
