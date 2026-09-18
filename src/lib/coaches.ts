export type CoachBio = {
  yearsCoaching: string;
  family: string;
  familyDetail?: string;
  history: string;
  whyYukon: string;
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: CoachBio;
};

export const coaches: Coach[] = [
  { id: "phillips", name: "Ryan Phillips", role: "Head Coach", photo: "/images/coaches/ryan-phillips.jpg" },
  {
    id: "furlong",
    name: "Jason Furlong",
    role: "Assistant Coach",
    photo: "/images/coaches/jason-furlong-dugout.jpg",
    bio: {
      yearsCoaching: "Since 2016",
      family: "Lindsey · Kaylee · Mason",
      familyDetail:
        "Married to Lindsey since 2018. They have been together since 2008 — middle school sweethearts. Two children, Kaylee (6) and Mason (2), and two dogs, Pistol and Minnie. He grew up in Tulsa, attended Bixby High School, then moved to Edmond and the University of Central Oklahoma.",
      history:
        "He began coaching in the 2016–17 season at Bishop McGuinness as the head freshman coach and head strength and conditioning coach. He came to Yukon in 2018–19 as a freshman assistant and strength and conditioning coordinator, and he has been here ever since. He now serves as the varsity pitching coach.",
      whyYukon:
        "He loves the community around the Yukon Millers, the support across town, and the culture this program has built and is still building.",
    },
  },
  { id: "lockett", name: "Clay Lockett", role: "Assistant Coach", photo: "/images/coaches/clay-lockett.jpg" },
  {
    id: "haines",
    name: "Dakota Haines",
    role: "Assistant Coach",
    photo: "/images/coaches/dakota-haines.jpg",
    bio: {
      yearsCoaching: "13th year · 9th at Yukon",
      family: "Kendall · Dax",
      familyDetail:
        "Married Kendall in December 2016. They have one son, Dax. He graduated from Harrah High School, then played at Coffeyville Community College, Benedictine College, and Southwestern Oklahoma State.",
      history:
        "After his playing career he joined the SWOSU staff as a graduate assistant, then came to Yukon in the spring of 2014. He spent five seasons here as an assistant before becoming the head coach at Southmoore. He returned to Yukon in the summer of 2023 as an assistant coach. This is his 13th year coaching and his ninth at Yukon.",
      whyYukon:
        "What he enjoys most is the community support — how welcoming the city and the people are.",
    },
  },
  { id: "teel", name: "Caleb Teel", role: "Assistant Coach", photo: "/images/coaches/caleb-teel.jpg" },
  { id: "booth", name: "Zac Booth", role: "Assistant Coach", photo: "/images/coaches/zac-booth.jpg" },
  { id: "knutson", name: "Ryan Knutson", role: "Assistant Coach", photo: "/images/coaches/ryan-knutson.jpg" },
  { id: "ray", name: "Damien Ray", role: "Assistant Coach" },
];

export const supportStaff: Coach[] = [
  { id: "woodruff", name: "Scotlyn Woodruff", role: "Manager" },
  { id: "matadamas", name: "Yoslin Matadamas", role: "Manager" },
  { id: "jones", name: "Breed Jones", role: "Student Assistant" },
  { id: "hormier", name: "Londyn Hormier", role: "Student Social Media" },
];

export function adjacentCoach(id: string, step: -1 | 1) {
  const index = coaches.findIndex((coach) => coach.id === id);
  if (index < 0) return undefined;
  const next = (index + step + coaches.length) % coaches.length;
  return coaches[next];
}

export function bioLine(value?: string) {
  return value?.trim() ? value : "—";
}
