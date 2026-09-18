export type SponsorTierId =
  | "presenting"
  | "scoreboard"
  | "cycle"
  | "grand-slam"
  | "signature"
  | "special"
  | "home-run"
  | "triple";

export type Sponsor = {
  id: string;
  name: string;
  mark: string;
  tier: SponsorTierId;
  placement: string;
  newThisYear?: boolean;
};

export const sponsorTiers: {
  id: SponsorTierId;
  label: string;
  kicker: string;
  blurb: string;
}[] = [
  {
    id: "presenting",
    label: "Presenting",
    kicker: "Program partner",
    blurb: "The largest 2026 program gift on the Home Run Club sheet.",
  },
  {
    id: "scoreboard",
    label: "Scoreboard",
    kicker: "Title partner",
    blurb: "The name on the Miller Field scoreboard — a two-year Yukon Baseball partner through 2027.",
  },
  {
    id: "cycle",
    label: "The Cycle",
    kicker: "Top club",
    blurb: "The Cycle package: outfield presence, home-game recognition, and four tickets to home games at the main field.",
  },
  {
    id: "grand-slam",
    label: "Grand Slam Club",
    kicker: "Outfield",
    blurb: "Grand Slam partners own the big outfield banners and get a table at a home game.",
  },
  {
    id: "signature",
    label: "Signature",
    kicker: "Game night",
    blurb: "In-game partners — foul balls, starting lineups, and the moments between pitches.",
  },
  {
    id: "special",
    label: "Special banners",
    kicker: "Program boards",
    blurb: "Roster and schedule banners posted with the 2026 sign list.",
  },
  {
    id: "home-run",
    label: "Home Run Club",
    kicker: "Outfield wall",
    blurb: "The 8′ × 7′ outfield banners that wrap Miller Field.",
  },
  {
    id: "triple",
    label: "Triple Club",
    kicker: "Entry gate",
    blurb: "3′ × 3′ signs at the Miller Field entry.",
  },
];

export const sponsors: Sponsor[] = [
  {
    id: "cooper-autogroup",
    name: "Cooper Autogroup",
    mark: "CA",
    tier: "presenting",
    placement: "Presenting partner · 2026 program sponsorship",
    newThisYear: true,
  },
  {
    id: "browns-driving-school",
    name: "Brown's Driving School",
    mark: "BD",
    tier: "scoreboard",
    placement: "Scoreboard · two-year partner through 2027",
  },
  {
    id: "fm-bank",
    name: "F&M Bank",
    mark: "F&M",
    tier: "cycle",
    placement: "The Cycle · Miller Field",
  },
  {
    id: "tfcu",
    name: "TFCU",
    mark: "TF",
    tier: "grand-slam",
    placement: "Grand Slam · outfield banner",
  },
  {
    id: "together-we-church",
    name: "Together We Church",
    mark: "TW",
    tier: "grand-slam",
    placement: "Grand Slam · outfield banner",
  },
  {
    id: "clemens-blair",
    name: "Clemens & Blair",
    mark: "CB",
    tier: "grand-slam",
    placement: "Grand Slam · outfield banner",
  },
  {
    id: "the-lokal",
    name: "The Lokal",
    mark: "LK",
    tier: "signature",
    placement: "Home Run Club banner · first foul ball of every inning",
  },
  {
    id: "noahs-7-heaven",
    name: "Noah's 7 Heaven",
    mark: "N7",
    tier: "signature",
    placement: "Sign plus starting lineups",
  },
  {
    id: "kris-avant",
    name: "Kris Avant",
    mark: "KA",
    tier: "special",
    placement: "Roster banner",
  },
  {
    id: "preferred-health",
    name: "Preferred Health Partners",
    mark: "PH",
    tier: "special",
    placement: "Schedule banner",
  },
  {
    id: "five-iron-golf",
    name: "Five Iron Golf",
    mark: "FI",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "earls-rib-palace",
    name: "Earl's Rib Palace",
    mark: "ER",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "h2-health",
    name: "H2 Health",
    mark: "H2",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
    newThisYear: true,
  },
  {
    id: "senior-care",
    name: "Senior Care",
    mark: "SC",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "yukon-national-bank",
    name: "Yukon National Bank",
    mark: "YN",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "livewell",
    name: "LiveWell",
    mark: "LW",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "security-benefit",
    name: "Security Benefit",
    mark: "SB",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "bancfirst",
    name: "BancFirst",
    mark: "BF",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
    newThisYear: true,
  },
  {
    id: "notable-roofing",
    name: "Notable Roofing",
    mark: "NR",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "h-spraying",
    name: "H Spraying",
    mark: "HS",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "warriors-for-freedom",
    name: "Warriors for Freedom",
    mark: "WF",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "flat-top",
    name: "Flat Top Lawn & Landscape",
    mark: "FT",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "bell-carpet",
    name: "Bell Carpet Cleaning",
    mark: "BC",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "interbank",
    name: "Interbank",
    mark: "IB",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "bad-brads",
    name: "Bad Brad's BBQ",
    mark: "BB",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "sod-by-sherry",
    name: "Sod by Sherry",
    mark: "SS",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "trane",
    name: "Trane",
    mark: "TR",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "rosete",
    name: "Rosete Construction",
    mark: "RC",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "bk-weaver",
    name: "BK Weaver",
    mark: "BK",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "cso-orthodontics",
    name: "CSO Orthodontics",
    mark: "CSO",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "crabtree",
    name: "Crabtree Custom Homes",
    mark: "CC",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "army-national-guard",
    name: "Army National Guard",
    mark: "NG",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "harris-ellis",
    name: "Harris-Ellis Equipment",
    mark: "HE",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "justin-sullivan",
    name: "Justin Sullivan",
    mark: "JS",
    tier: "home-run",
    placement: "Outfield banner · in memory",
  },
  {
    id: "rkpb",
    name: "Roberson Kolker Prentice Burns",
    mark: "RK",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
    newThisYear: true,
  },
  {
    id: "gatlin",
    name: "Gatlin Heat & Air",
    mark: "GH",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
    newThisYear: true,
  },
  {
    id: "fire-by-trade",
    name: "Fire by Trade",
    mark: "FT",
    tier: "home-run",
    placement: "Home Run Club · outfield banner",
  },
  {
    id: "brady-built",
    name: "Brady Built Homes",
    mark: "BB",
    tier: "triple",
    placement: "Triple Club · entry-gate sign",
  },
  {
    id: "terry-family",
    name: "Terry Family",
    mark: "TF",
    tier: "triple",
    placement: "Triple Club · entry-gate sign",
  },
  {
    id: "platinum-heat-air",
    name: "Platinum Heat and Air",
    mark: "PH",
    tier: "triple",
    placement: "Triple Club · entry-gate sign",
  },
  {
    id: "coles-garden",
    name: "Coles Garden",
    mark: "CG",
    tier: "triple",
    placement: "Triple Club · entry-gate sign",
  },
];

export function sponsorsByTier(tier: SponsorTierId) {
  return sponsors
    .filter((sponsor) => sponsor.tier === tier)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const featuredSponsors = [
  ...sponsorsByTier("presenting"),
  ...sponsorsByTier("scoreboard"),
  ...sponsorsByTier("cycle"),
  ...sponsorsByTier("grand-slam"),
  ...sponsorsByTier("signature"),
];

export const sponsorCount = sponsors.length;
