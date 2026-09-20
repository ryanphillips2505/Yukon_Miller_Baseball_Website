export type AllStateHonoree = {
  id: string;
  firstName: string;
  lastName: string;
  year: number;
  newsSlug?: string;
};

export const allStateHonorees: AllStateHonoree[] = [
  { id: "david-lassiter", firstName: "David", lastName: "Lassiter", year: 1977 },
  { id: "kerry-lassiter", firstName: "Kerry", lastName: "Lassiter", year: 1978 },
  { id: "randy-ross", firstName: "Randy", lastName: "Ross", year: 1979 },
  { id: "joe-cooper", firstName: "Joe", lastName: "Cooper", year: 1980 },
  { id: "kevin-jacobs", firstName: "Kevin", lastName: "Jacobs", year: 1980 },
  { id: "billy-jester", firstName: "Billy", lastName: "Jester", year: 1982 },
  { id: "jeff-deckard", firstName: "Jeff", lastName: "Deckard", year: 1983 },
  { id: "bobby-wilkerson", firstName: "Bobby", lastName: "Wilkerson", year: 1987 },
  { id: "sean-karn", firstName: "Sean", lastName: "Karn", year: 1988 },
  { id: "craig-bohannon", firstName: "Craig", lastName: "Bohannon", year: 1989 },
  { id: "terry-horn", firstName: "Terry", lastName: "Horn", year: 1991 },
  { id: "rob-roberts", firstName: "Rob", lastName: "Roberts", year: 1991 },
  { id: "matt-allard", firstName: "Matt", lastName: "Allard", year: 1992 },
  { id: "wade-higgins", firstName: "Wade", lastName: "Higgins", year: 1995 },
  { id: "clay-hawkins", firstName: "Clay", lastName: "Hawkins", year: 1995 },
  { id: "kale-schroeder", firstName: "Kale", lastName: "Schroeder", year: 1995 },
  { id: "steve-hale", firstName: "Steve", lastName: "Hale", year: 1998 },
  { id: "nate-dion", firstName: "Nate", lastName: "Dion", year: 2000 },
  { id: "joey-gillikin", firstName: "Joey", lastName: "Gillikin", year: 2000 },
  { id: "denver-kitch", firstName: "Denver", lastName: "Kitch", year: 2000 },
  { id: "cory-metzler", firstName: "Cory", lastName: "Metzler", year: 2000 },
  { id: "bryan-weaver", firstName: "Bryan", lastName: "Weaver", year: 2000 },
  { id: "justin-james", firstName: "Justin", lastName: "James", year: 2001 },
  { id: "jason-long", firstName: "Jason", lastName: "Long", year: 2001 },
  { id: "brett-mcdonald", firstName: "Brett", lastName: "McDonald", year: 2002 },
  { id: "juston-sullivan", firstName: "Juston", lastName: "Sullivan", year: 2002 },
  { id: "justin-barnes", firstName: "Justin", lastName: "Barnes", year: 2008 },
  { id: "ryan-gibson", firstName: "Ryan", lastName: "Gibson", year: 2009 },
  { id: "chad-james", firstName: "Chad", lastName: "James", year: 2009 },
  { id: "cisco-factor", firstName: "Cisco", lastName: "Factor", year: 2011 },
  { id: "colt-pickens", firstName: "Colt", lastName: "Pickens", year: 2012 },
  { id: "jon-denney", firstName: "Jon", lastName: "Denney", year: 2013 },
  { id: "landon-eason", firstName: "Landon", lastName: "Eason", year: 2013 },
  { id: "garrett-benge", firstName: "Garrett", lastName: "Benge", year: 2014 },
  { id: "cross-factor", firstName: "Cross", lastName: "Factor", year: 2017 },
  { id: "braylen-wimmer", firstName: "Braylen", lastName: "Wimmer", year: 2019 },
  { id: "jett-lodes", firstName: "Jett", lastName: "Lodes", year: 2020 },
  { id: "josh-sanders", firstName: "Josh", lastName: "Sanders", year: 2020 },
  {
    id: "carson-benge",
    firstName: "Carson",
    lastName: "Benge",
    year: 2021,
    newsSlug: "from-yukon-to-the-big-leagues",
  },
  { id: "carson-lee", firstName: "Carson", lastName: "Lee", year: 2021 },
  {
    id: "colton-strange",
    firstName: "Colton",
    lastName: "Strange",
    year: 2023,
    newsSlug: "from-yukon-to-a-national-championship",
  },
  { id: "chance-owens", firstName: "Chance", lastName: "Owens", year: 2024 },
  { id: "grady-hoke", firstName: "Grady", lastName: "Hoke", year: 2025 },
  { id: "gentry-hoke", firstName: "Gentry", lastName: "Hoke", year: 2026 },
];

const hallOfFameAllStateIds = new Set(["joe-cooper", "juston-sullivan"]);

export function honoreeName(honoree: AllStateHonoree) {
  return `${honoree.firstName} ${honoree.lastName}`;
}

export function isAthleticsHallOfFame(honoree: AllStateHonoree) {
  return hallOfFameAllStateIds.has(honoree.id);
}

export function decadeLabel(year: number) {
  return `${Math.floor(year / 10) * 10}s`;
}

export function allStateByDecade() {
  const groups = new Map<string, AllStateHonoree[]>();

  for (const honoree of allStateHonorees) {
    const key = decadeLabel(honoree.year);
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(honoree);
    } else {
      groups.set(key, [honoree]);
    }
  }

  return [...groups.entries()];
}

const first = allStateHonorees[0];
const latest = allStateHonorees[allStateHonorees.length - 1];

export const allStateHall = {
  title: "Yukon Millers All-State",
  count: allStateHonorees.length,
  first,
  latest,
  span: `${first.year}–${latest.year}`,
  years: latest.year - first.year + 1,
  decades: allStateByDecade().length,
} as const;
