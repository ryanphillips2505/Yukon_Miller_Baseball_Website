export type FacilityPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout: "feature" | "wide" | "tile" | "portrait";
};

export type ParkPhoto = FacilityPhoto;

export const parkPhotos: FacilityPhoto[] = [
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
    id: "aerial-clubhouse",
    src: "/images/facilities/miller-field-aerial-clubhouse.jpg",
    alt: "Aerial of the Miller Field clubhouse and grandstand, with the diamond beyond",
    caption: "Miller Field",
    width: 2200,
    height: 1162,
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
];

export const clubhousePhotos: FacilityPhoto[] = [
  {
    id: "room",
    src: "/images/facilities/clubhouse-room.jpg",
    alt: "Yukon Miller Baseball clubhouse with the YM rug and empty lockers",
    caption: "The clubhouse",
    width: 2200,
    height: 1650,
    layout: "feature",
  },
  {
    id: "lockers",
    src: "/images/facilities/clubhouse-lockers.jpg",
    alt: "Yukon home, road, and pinstripe jerseys hanging above the YM baseball rug",
    caption: "The lockers",
    width: 1680,
    height: 2240,
    layout: "portrait",
  },
  {
    id: "red-mark",
    src: "/images/facilities/clubhouse-red-mark.jpg",
    alt: "YM mark on the clubhouse wall under red light",
    caption: "Millers red",
    width: 1680,
    height: 2240,
    layout: "portrait",
  },
  {
    id: "mark",
    src: "/images/facilities/clubhouse-mark.jpg",
    alt: "Red YM mark on the wood slat wall in the Yukon Miller clubhouse",
    caption: "The mark",
    width: 1800,
    height: 1350,
    layout: "tile",
  },
  {
    id: "red-room",
    src: "/images/facilities/clubhouse-red-room.jpg",
    alt: "Yukon Miller clubhouse under red light with the YM rug in the center",
    caption: "Lights out",
    width: 1800,
    height: 1350,
    layout: "tile",
  },
];

export const parkFacts = [
  { label: "Opened", value: "2014" },
  { label: "Regionals won here", value: "5" },
  { label: "Host", value: "State · Regional · Showcase" },
  { label: "City", value: "Yukon, Oklahoma" },
] as const;

export const millerFieldHistory = [
  "Miller Field opened in 2014 behind Yukon High School — a covered grandstand, a press box, and Yukon painted in the turf. It is the home park for Varsity, JV Red, and JV White, and it has become one of the OSSAA’s regular postseason stops: 6A regionals, Class 5A and Class B state rounds, showcases, and the Class 2A fall quarterfinals and semifinals.",
  "The Millers have won the regional on this field five times — 2015, 2016, 2017, 2021, and 2026. Each of those titles sent Yukon to the Class 6A state tournament. The 2015 and 2017 clubs reached the semifinals. In 2026 they beat Choctaw 7–6 on their own turf and won a state quarterfinal before the run ended. The program’s state championship is 1982, a generation before this park opened.",
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
