import type { ArticleBlock } from "@/lib/news-blocks";

export const czechFestivalStory = {
  slug: "czech-festival-parade-2026",
  title: "Yukon Baseball Hits a Home Run at the 60th Annual Czech Festival Parade",
  date: "October 4, 2026",
  category: "News" as const,
  excerpt:
    "Yukon Miller Baseball was proud to once again take part in one of our community’s favorite traditions, the 60th Annual Oklahoma Czech Festival Parade in downtown Yukon.",
  image: {
    src: "/images/news/czech-festival-parade-2026-tight.jpg",
    alt: "The Yukon Miller Baseball program together in front of the Czech Festival Parade float and Czechin’ Our Roots banner",
    width: 1600,
    height: 635,
    focus: "50% 55%",
    banner: {
      src: "/images/news/czech-festival-parade-2026-banner2.jpg",
      width: 1600,
      height: 680,
      focus: "50% 48%",
    },
    card: {
      src: "/images/news/czech-festival-parade-2026-card.jpg",
      width: 800,
      height: 640,
      focus: "50% 48%",
    },
  },
  body: [
    "Yukon Miller Baseball was proud to once again take part in one of our community’s favorite traditions, the 60th Annual Oklahoma Czech Festival Parade in downtown Yukon.",
  ],
  blocks: [
    {
      type: "p",
      text: "Yukon Miller Baseball was proud to once again take part in one of our community’s favorite traditions, the 60th Annual Oklahoma Czech Festival Parade in downtown Yukon.",
    },
    {
      type: "p",
      text: "Players and coaches made their way down historic Route 66 aboard the Yukon Baseball float as thousands of people gathered along Main Street for the annual celebration. This year’s festival marked a special milestone, celebrating 60 years of the Oklahoma Czech Festival during the 100th anniversary year of Route 66.",
    },
    {
      type: "gallery",
      photos: [
        {
          src: "/images/news/czech-festival-parade-2026-white.jpg",
          alt: "Yukon Miller Baseball players in home white pinstripes with the Czechin’ Our Roots banner",
          width: 1100,
          height: 825,
        },
        {
          src: "/images/news/czech-festival-parade-2026-black.jpg",
          alt: "Yukon Miller Baseball players in black uniforms with the Czechin’ Our Roots banner",
          width: 1100,
          height: 825,
        },
      ],
    },
    {
      type: "p",
      text: "For Yukon Baseball, participating in the Czech Festival Parade has become much more than another event on the calendar. It is a player and coach favorite each year and an opportunity for our program to be part of a tradition that brings the entire Yukon community together.",
    },
    {
      type: "image",
      src: "/images/news/czech-festival-parade-2026-squad.jpg",
      alt: "Yukon Miller Baseball players in black and red uniforms with the parade float and Czechin’ Our Roots banner",
      width: 1200,
      height: 900,
    },
    {
      type: "p",
      text: "This year’s float was designed and built by the Yukon Baseball Czech Festival Committee, who hit a home run with this year’s design. Their creativity and hard work helped make the day another memorable experience for our players and coaches.",
    },
    {
      type: "gallery",
      photos: [
        {
          src: "/images/news/czech-festival-parade-2026-float.jpg",
          alt: "The Yukon Baseball Czech Festival Parade float with hay bales, cactuses, Route 66 signs, and a Millers school bus",
          width: 1200,
          height: 900,
        },
        {
          src: "/images/news/czech-festival-parade-2026-sign.jpg",
          alt: "The back of the Yukon Baseball float reading Yukon Millers Baseball Czechin’ Our Roots on Route 66",
          width: 1200,
          height: 900,
        },
      ],
    },
    {
      type: "p",
      text: "Events like the Czech Festival Parade also highlight the many volunteers who give their time throughout the year to support Yukon Baseball. From special events and fundraisers to countless hours working behind the scenes, their commitment helps provide experiences and opportunities for our players that extend far beyond the baseball field.",
    },
    {
      type: "gallery",
      photos: [
        {
          src: "/images/news/czech-festival-parade-2026-committee.jpg",
          alt: "Volunteers, coaches, and Yukon Miller Baseball players with this year’s Czech Festival Parade float",
          width: 1200,
          height: 800,
        },
        {
          src: "/images/news/czech-festival-parade-2026-red.jpg",
          alt: "Yukon Miller Baseball players in red Yukon’s Best jerseys standing on the Czech Festival Parade float",
          width: 1200,
          height: 800,
        },
      ],
    },
    {
      type: "p",
      text: "Yukon Baseball is grateful to everyone who helped make this year’s parade possible and proud to once again represent the Millers along historic Route 66.",
    },
  ] satisfies ArticleBlock[],
};
