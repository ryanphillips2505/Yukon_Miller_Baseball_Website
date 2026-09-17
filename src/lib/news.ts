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
    slug: "clayton-strange-hutchinson",
    title: "Clayton Strange commits to Hutchinson CC",
    date: "Posted on yukonbaseball.com",
    category: "Commit",
    excerpt:
      "Strange is the latest Miller to keep playing after high school, signing with Hutchinson Community College.",
    body: [
      "Yukon High School baseball announced that Clayton Strange has committed to Hutchinson Community College.",
      "College decisions post here as players make them official. Families and college coaches can reach the staff at yukonmillerbaseball@gmail.com.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function latestArticles(limit = 3) {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
