export const parkPhotos = {
  night: {
    src: "/images/facilities/miller-field-night.jpg",
    alt: "Miller Field at night, lights on over the grandstand and turf",
    width: 2800,
    height: 893,
  },
  diamond: {
    src: "/images/facilities/miller-field-diamond.jpg",
    alt: "Miller Field from home plate, looking to the Yukon Millers grandstand",
    width: 2048,
    height: 1536,
  },
  yukonY: {
    src: "/images/facilities/miller-field-yukon-y.jpg",
    alt: "Yukon painted in the Miller Field turf, with the grandstand beyond",
    width: 2200,
    height: 1650,
  },
} as const;

export const fields = [
  {
    id: "miller-field",
    name: "Miller Field",
    usedBy: "Varsity, JV Red, and JV White",
    summary:
      "Miller Field opened in 2014 behind Yukon High School. The Home Run Club calls it Yukon’s premier baseball facility — the program has hosted state and regional tournaments plus showcase events for high school players from across Oklahoma.",
    notes: [
      "Main stadium behind the high school on Yukon Parkway",
      "Concession stand and sponsor signage at the varsity field",
      "Press box used for home games",
    ],
  },
];
