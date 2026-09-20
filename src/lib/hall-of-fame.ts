export type HallOfFameMember = {
  id: string;
  firstName: string;
  lastName: string;
  classYear: number;
  sport: string;
  allStateYear?: number;
};

export const athleticsHallOfFame: HallOfFameMember[] = [
  {
    id: "joe-cooper",
    firstName: "Joe",
    lastName: "Cooper",
    classYear: 2024,
    sport: "Baseball",
    allStateYear: 1980,
  },
  {
    id: "justin-sullivan",
    firstName: "Justin",
    lastName: "Sullivan",
    classYear: 2025,
    sport: "Baseball",
    allStateYear: 2002,
  },
];

export function hallMemberName(member: HallOfFameMember) {
  return `${member.firstName} ${member.lastName}`;
}

export const hallOfFame = {
  title: "Yukon Athletics Hall of Fame",
  kicker: "Highest honor",
  count: athleticsHallOfFame.length,
  firstClass: athleticsHallOfFame[0]?.classYear,
  latestClass: athleticsHallOfFame[athleticsHallOfFame.length - 1]?.classYear,
} as const;
