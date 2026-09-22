export type ClubMark = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type DraftLine = {
  year: number;
  round: number;
  overall?: number;
  club: string;
  outcome: "signed" | "did-not-sign";
};

export type DraftedMiller = {
  id: string;
  firstName: string;
  lastName: string;
  signedClub: string;
  signedLogo: ClubMark;
  colors: {
    primary: string;
    secondary: string;
  };
  lines: DraftLine[];
  note: string;
  mlbDebut?: string;
};

const redSox: ClubMark = {
  src: "/images/mlb/boston-red-sox.png",
  width: 500,
  height: 500,
  alt: "Boston Red Sox",
};

export const draftedMillers: DraftedMiller[] = [
  {
    id: "terry-horn",
    firstName: "Terry",
    lastName: "Horn",
    signedClub: "Boston Red Sox",
    signedLogo: redSox,
    colors: { primary: "#BD3039", secondary: "#0D2B56" },
    lines: [
      {
        year: 1991,
        round: 2,
        overall: 51,
        club: "Boston Red Sox",
        outcome: "signed",
      },
    ],
    note: "Drafted and signed out of Yukon High School",
  },
  {
    id: "nate-dion",
    firstName: "Nate",
    lastName: "Dion",
    signedClub: "Tampa Bay Devil Rays",
    signedLogo: {
      src: "/images/mlb/tampa-bay-devil-rays.png",
      width: 500,
      height: 500,
      alt: "Tampa Bay Devil Rays",
    },
    colors: { primary: "#092C5C", secondary: "#8FBCE6" },
    lines: [
      {
        year: 2000,
        round: 15,
        overall: 436,
        club: "Tampa Bay Devil Rays",
        outcome: "signed",
      },
    ],
    note: "Drafted and signed out of Yukon High School",
  },
  {
    id: "denver-kitch",
    firstName: "Denver",
    lastName: "Kitch",
    signedClub: "Baltimore Orioles",
    signedLogo: {
      src: "/images/mlb/baltimore-orioles.png",
      width: 500,
      height: 500,
      alt: "Baltimore Orioles",
    },
    colors: { primary: "#DF4601", secondary: "#000000" },
    lines: [
      {
        year: 2000,
        round: 29,
        club: "Pittsburgh Pirates",
        outcome: "did-not-sign",
      },
      {
        year: 2002,
        round: 9,
        club: "Los Angeles Dodgers",
        outcome: "did-not-sign",
      },
      {
        year: 2004,
        round: 13,
        overall: 379,
        club: "Baltimore Orioles",
        outcome: "signed",
      },
    ],
    note: "",
  },
  {
    id: "justin-james",
    firstName: "Justin",
    lastName: "James",
    signedClub: "Toronto Blue Jays",
    signedLogo: {
      src: "/images/mlb/toronto-blue-jays.png",
      width: 500,
      height: 500,
      alt: "Toronto Blue Jays",
    },
    colors: { primary: "#134A8E", secondary: "#E8291C" },
    lines: [
      {
        year: 2001,
        round: 6,
        club: "Boston Red Sox",
        outcome: "did-not-sign",
      },
      {
        year: 2003,
        round: 5,
        club: "Toronto Blue Jays",
        outcome: "signed",
      },
    ],
    note: "Reached Major League Baseball with the Oakland Athletics in 2010",
  },
  {
    id: "chad-james",
    firstName: "Chad",
    lastName: "James",
    signedClub: "Florida Marlins",
    signedLogo: {
      src: "/images/mlb/florida-marlins.png",
      width: 500,
      height: 500,
      alt: "Florida Marlins",
    },
    colors: { primary: "#00A3E0", secondary: "#000000" },
    lines: [
      {
        year: 2009,
        round: 1,
        overall: 18,
        club: "Florida Marlins",
        outcome: "signed",
      },
    ],
    note: "Drafted and signed out of Yukon High School",
  },
  {
    id: "jon-denney",
    firstName: "Jon",
    lastName: "Denney",
    signedClub: "Boston Red Sox",
    signedLogo: redSox,
    colors: { primary: "#BD3039", secondary: "#0D2B56" },
    lines: [
      {
        year: 2013,
        round: 3,
        overall: 81,
        club: "Boston Red Sox",
        outcome: "signed",
      },
    ],
    note: "Drafted and signed out of Yukon High School",
  },
  {
    id: "garrett-benge",
    firstName: "Garrett",
    lastName: "Benge",
    signedClub: "Boston Red Sox",
    signedLogo: redSox,
    colors: { primary: "#BD3039", secondary: "#0D2B56" },
    lines: [
      {
        year: 2015,
        round: 22,
        club: "Cleveland Indians",
        outcome: "did-not-sign",
      },
      {
        year: 2017,
        round: 13,
        overall: 401,
        club: "Boston Red Sox",
        outcome: "signed",
      },
    ],
    note: "",
  },
  {
    id: "braylen-wimmer",
    firstName: "Braylen",
    lastName: "Wimmer",
    signedClub: "Colorado Rockies",
    signedLogo: {
      src: "/images/mlb/colorado-rockies.png",
      width: 500,
      height: 500,
      alt: "Colorado Rockies",
    },
    colors: { primary: "#33006F", secondary: "#C4CED4" },
    lines: [
      {
        year: 2022,
        round: 18,
        club: "Philadelphia Phillies",
        outcome: "did-not-sign",
      },
      {
        year: 2023,
        round: 8,
        club: "Colorado Rockies",
        outcome: "signed",
      },
    ],
    note: "",
  },
  {
    id: "carson-benge",
    firstName: "Carson",
    lastName: "Benge",
    signedClub: "New York Mets",
    signedLogo: {
      src: "/images/mlb/new-york-mets.png",
      width: 500,
      height: 500,
      alt: "New York Mets",
    },
    colors: { primary: "#002D72", secondary: "#FF5910" },
    lines: [
      {
        year: 2024,
        round: 1,
        overall: 19,
        club: "New York Mets",
        outcome: "signed",
      },
    ],
    note: "Signed with the Mets",
    mlbDebut: "March 26, 2026 · Citi Field",
  },
];

export function draftedName(player: DraftedMiller) {
  return `${player.firstName} ${player.lastName}`;
}

export function signedLine(player: DraftedMiller) {
  const signed = player.lines.find((line) => line.outcome === "signed");
  if (!signed) {
    throw new Error(`${player.id} is missing a signed draft line`);
  }
  return signed;
}

export function isFirstRound(player: DraftedMiller) {
  return signedLine(player).round === 1;
}

export function reachedMajors(player: DraftedMiller) {
  return Boolean(player.mlbDebut) || player.note.includes("Major League Baseball");
}

export function ordinal(value: number) {
  const teen = value % 100;
  if (teen >= 11 && teen <= 13) return `${value}th`;

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export function draftPickLabel(line: DraftLine) {
  const round = `${ordinal(line.round)} Round`;
  if (line.overall) {
    return `${round}, ${ordinal(line.overall)} Overall`;
  }
  return round;
}

export function compactPick(line: DraftLine) {
  if (line.overall) {
    return `${line.year} · ${ordinal(line.round)} / ${ordinal(line.overall)}`;
  }
  return `${line.year} · ${ordinal(line.round)}`;
}

export function adjacentDrafted(id: string, step: -1 | 1) {
  const index = draftedMillers.findIndex((player) => player.id === id);
  if (index < 0) return undefined;
  return draftedMillers[index + step];
}

const firstSigned = signedLine(draftedMillers[0]);
const latestSigned = signedLine(draftedMillers[draftedMillers.length - 1]);

export const draftedBoard = {
  title: "Yukon High School MLB Draft Picks Who Signed",
  count: draftedMillers.length,
  firstRound: draftedMillers.filter(isFirstRound).length,
  majors: draftedMillers.filter(reachedMajors).length,
  firstYear: firstSigned.year,
  latestYear: latestSigned.year,
  span: `${firstSigned.year}–${latestSigned.year}`,
} as const;
