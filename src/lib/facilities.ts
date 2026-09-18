export type ParkPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout: "feature" | "wide" | "tile";
};

export const parkPhotos: ParkPhoto[] = [
  {
    id: "aerial-mark",
    src: "/images/facilities/miller-field-aerial-mark.jpg",
    alt: "Aerial of Miller Field with Yukon and Millers in the turf and the YM mark behind home",
    caption: "Yukon Millers",
    width: 2200,
    height: 1177,
    layout: "feature",
  },
  {
    id: "night",
    src: "/images/facilities/miller-field-night.jpg",
    alt: "Miller Field at night with the lights on over the grandstand and turf",
    caption: "Under the lights",
    width: 2800,
    height: 893,
    layout: "wide",
  },
  {
    id: "diamond",
    src: "/images/facilities/miller-field-diamond.jpg",
    alt: "Center field view of Miller Field, looking in to home plate and the grandstand",
    caption: "Center field view",
    width: 2048,
    height: 1536,
    layout: "tile",
  },
  {
    id: "yukon-y",
    src: "/images/facilities/miller-field-yukon-y.jpg",
    alt: "Yukon painted in the Miller Field turf, with the grandstand beyond",
    caption: "The turf",
    width: 1800,
    height: 1350,
    layout: "tile",
  },
  {
    id: "aerial-clubhouse",
    src: "/images/facilities/miller-field-aerial-clubhouse.jpg",
    alt: "Aerial of the Miller Field clubhouse and grandstand, with the diamond beyond",
    caption: "Miller Field",
    width: 2200,
    height: 1162,
    layout: "tile",
  },
  {
    id: "lockers-club",
    src: "/images/facilities/miller-field-lockers-club.jpg",
    alt: "Yukon Miller Baseball lockers with home and road jerseys hanging",
    caption: "The clubhouse",
    width: 2000,
    height: 1500,
    layout: "tile",
  },
];

export const parkFacts = [
  { label: "Opened", value: "2014" },
  { label: "Clubs", value: "Varsity · JV Red · JV White" },
  { label: "Host", value: "State · Regional · Showcase" },
  { label: "City", value: "Yukon, Oklahoma" },
] as const;

export const fields = [
  {
    id: "miller-field",
    name: "Miller Field",
    usedBy: "Varsity, JV Red, and JV White",
    summary:
      "Opened in 2014 behind Yukon High School. Home of Yukon Miller Baseball, and the park that has hosted state, regional, and showcase baseball for programs from across Oklahoma.",
    notes: [
      "Main stadium behind the high school on Yukon Parkway",
      "Concession stand and sponsor signage at the varsity field",
      "Press box used for home games",
    ],
  },
];
