export type SponsorTierId =
  | "presenting"
  | "scoreboard"
  | "cycle"
  | "grand-slam"
  | "signature"
  | "home-run"
  | "triple";

export type SponsorLogo = {
  src: string;
  width: number;
  height: number;
};

export type Sponsor = {
  id: string;
  name: string;
  mark: string;
  tier: SponsorTierId;
  placement: string;
  newThisYear?: boolean;
  logo?: SponsorLogo;
};

const sponsorLogos: Record<string, SponsorLogo> = {
  "army-national-guard": { src: "/images/sponsors/logos/army-national-guard.png", width: 420, height: 420 },
  "bad-brads": { src: "/images/sponsors/logos/bad-brads.png", width: 181, height: 113 },
  "bancfirst": { src: "/images/sponsors/logos/bancfirst.png", width: 900, height: 185 },
  "bell-carpet": { src: "/images/sponsors/logos/bell-carpet.png", width: 420, height: 420 },
  "bk-weaver": { src: "/images/sponsors/logos/bk-weaver.png", width: 1221, height: 600 },
  "brady-built": { src: "/images/sponsors/logos/brady-built.png", width: 250, height: 69 },
  "browns-driving-school": { src: "/images/sponsors/logos/browns-driving-school.png", width: 780, height: 231 },
  "clemens-blair": { src: "/images/sponsors/logos/clemens-blair.png", width: 1139, height: 720 },
  "coles-garden": { src: "/images/sponsors/logos/coles-garden.png", width: 800, height: 212 },
  "cooper-autogroup": { src: "/images/sponsors/logos/cooper-autogroup.png", width: 900, height: 251 },
  "crabtree": { src: "/images/sponsors/logos/crabtree.png", width: 900, height: 207 },
  "cso-orthodontics": { src: "/images/sponsors/logos/cso-orthodontics.png", width: 900, height: 298 },
  "earls-rib-palace": { src: "/images/sponsors/logos/earls-rib-palace.png", width: 622, height: 420 },
  "fire-by-trade": { src: "/images/sponsors/logos/fire-by-trade.png", width: 900, height: 301 },
  "five-iron-golf": { src: "/images/sponsors/logos/five-iron-golf.png", width: 303, height: 40 },
  "fm-bank": { src: "/images/sponsors/logos/fm-bank.png", width: 683, height: 132 },
  "gatlin": { src: "/images/sponsors/logos/gatlin.png", width: 385, height: 130 },
  "h-spraying": { src: "/images/sponsors/logos/h-spraying.png", width: 900, height: 273 },
  "h2-health": { src: "/images/sponsors/logos/h2-health.png", width: 219, height: 125 },
  "harris-ellis": { src: "/images/sponsors/logos/harris-ellis.png", width: 300, height: 161 },
  "interbank": { src: "/images/sponsors/logos/interbank.png", width: 900, height: 164 },
  "livewell": { src: "/images/sponsors/logos/livewell.png", width: 269, height: 270 },
  "lowes": { src: "/images/sponsors/logos/lowes.png", width: 900, height: 424 },
  "notable-roofing": { src: "/images/sponsors/logos/notable-roofing.png", width: 900, height: 238 },
  "platinum-heat-air": { src: "/images/sponsors/logos/platinum-heat-air.png", width: 420, height: 420 },
  "rkpb": { src: "/images/sponsors/logos/rkpb.png", width: 373, height: 420 },
  "tfcu": { src: "/images/sponsors/logos/tfcu.png", width: 398, height: 134 },
  "the-lokal": { src: "/images/sponsors/logos/the-lokal.png", width: 695, height: 420 },
  "together-we-church": { src: "/images/sponsors/logos/together-we-church.png", width: 381, height: 420 },
  "trane": { src: "/images/sponsors/logos/trane.png", width: 900, height: 299 },
  "warriors-for-freedom": { src: "/images/sponsors/logos/warriors-for-freedom.png", width: 455, height: 420 },
  "yukon-national-bank": { src: "/images/sponsors/logos/yukon-national-bank.png", width: 567, height: 106 },
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

const sponsorList: Sponsor[] = [
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
    id: "lowes",
    name: "Lowe's",
    mark: "LO",
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

export const sponsors: Sponsor[] = sponsorList.map((sponsor) => ({
  ...sponsor,
  logo: sponsorLogos[sponsor.id],
}));

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

export const sponsorshipForm = {
  href: "/2026-2027-sponsorship-packet.pdf",
  title: "2026–27 Sponsorship Packet",
} as const;
