export const brand = {
  primary: {
    src: "/images/yukon-baseball-primary-logo.png",
    width: 1774,
    height: 887,
    alt: "Yukon Baseball — Oklahoma outline with YM mark and Yukon, Oklahoma wordmark",
  },
  state: {
    src: "/images/yukon-baseball-state-float.png",
    width: 1210,
    height: 532,
    alt: "Yukon Baseball — Oklahoma outline with YM mark",
  },
  mark: {
    src: "/images/logo-mark.jpg",
    width: 512,
    height: 512,
    alt: "Yukon Baseball mark",
  },
} as const;

export const program = {
  name: "Yukon Miller Baseball",
  shortName: "Millers",
  school: "Yukon High School",
  classification: "OSSAA Class 6A",
  city: "Yukon, Oklahoma",
  email: "yukonmillerbaseball@gmail.com",
  street: "1777 S Yukon Parkway",
  cityStateZip: "Yukon, OK 73099",
  mapsUrl:
    "https://maps.google.com/?q=1777+S+Yukon+Parkway,+Yukon,+OK+73099",
  directions:
    "Miller Field sits behind Yukon High School on Yukon Parkway, two miles north of I-40 at exit 138.",
  quote: {
    text: "Baseball is about talent, hard work, and strategy. But at the deepest level, it’s about love, integrity, and respect.",
    attribution: "Pat Gillick",
  },
} as const;

export const navPrimary = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/roster", label: "Roster" },
  { href: "/coaches", label: "Coaches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/facilities", label: "Facilities" },
] as const;

export const navMore = [
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
  { href: "/recruiting", label: "Recruiting" },
  { href: "/camps", label: "Camps" },
  { href: "/alumni", label: "Alumni" },
  { href: "/fans", label: "Fan info" },
  { href: "/records", label: "Records" },
  { href: "/media", label: "Media" },
] as const;

export const allNav = [...navPrimary, ...navMore];

export const teams = [
  { id: "varsity", label: "Varsity", field: "Miller Field" },
  { id: "jv-red", label: "JV Red", field: "Miller Field" },
  { id: "jv-white", label: "JV White", field: "Miller Field" },
] as const;

export type TeamId = (typeof teams)[number]["id"];
