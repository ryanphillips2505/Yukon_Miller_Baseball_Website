import type { ArticleBlock } from "@/lib/news-blocks";

export const schedule2027Story = {
  slug: "yukon-millers-release-2027-schedule",
  title: "Yukon Millers Release 2027 Baseball Schedule",
  date: "September 24, 2026",
  category: "News" as const,
  excerpt:
    "Yukon Millers Baseball has released its 2027 schedule, featuring two defending state champions, multiple tournaments and a trip to Mississippi.",
  image: {
    src: "/images/news/yukon-millers-release-2027-schedule.jpg",
    alt: "2027 Yukon Miller Baseball schedule graphic presented by Dunkin' of Yukon",
    width: 800,
    height: 1000,
    focus: "50% 18%",
    size: "feature" as const,
  },
  body: [
    "Yukon Millers Baseball has released its 2027 schedule, featuring a challenging slate that includes two defending state champions, multiple tournaments and an out-of-state trip to Mississippi.",
  ],
  blocks: [
    {
      type: "p",
      text: "YUKON, Okla. — Yukon Millers Baseball has released its 2027 schedule, featuring a challenging slate that includes two defending state champions, multiple tournaments and an out-of-state trip to Mississippi.",
    },
    {
      type: "p",
      text: "The Millers will open the season March 1 at Mustang, facing the defending Class 6A state champions. Yukon will then host Mustang, Bethany and Capital Hill before traveling to Bricktown Ballpark on March 5 to take on Class 5A defending state champion Carl Albert.",
    },
    {
      type: "p",
      text: "One of the highlights comes March 11-13, when the Millers travel to Biloxi, Mississippi, for the Biloxi Tournament, giving the team an opportunity to compete against teams from outside Oklahoma.",
    },
    {
      type: "p",
      text: "Yukon will also compete in the Choctaw Tournament March 25-27 and the Enid Festival April 1-3, along with a full April schedule featuring matchups against Putnam City North, Enid, Santa Fe, Westmoore, Southmoore, Deer Creek, Choctaw, PCO and Jenks.",
    },
    {
      type: "p",
      text: "The regular season concludes April 30 against Jenks, followed by OSSAA Regionals May 6-8 and the OSSAA State Tournament May 13-15.",
    },
    {
      type: "h2",
      text: "Stay Connected With Yukon Baseball",
    },
    {
      type: "p",
      text: "Fans can now sync team schedules directly to their device calendars through the Yukon Baseball website. Schedule updates will automatically sync, and the feature is available for all teams.",
    },
    {
      type: "p",
      text: "With championship-caliber opponents, tournament baseball, a trip to the Gulf Coast and new ways for families to stay connected, the 2027 season is shaping up to be an exciting one for Yukon Baseball.",
    },
    {
      type: "p",
      text: "The Millers get started March 1 at Mustang.",
    },
  ] satisfies ArticleBlock[],
};
