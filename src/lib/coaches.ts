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
  {
    id: "phillips",
    name: "Ryan Phillips",
    role: "Head Coach",
    photo: "/images/coaches/ryan-phillips-field.jpg",
    bio: {
      yearsCoaching: "18",
      family: "Lyndsey · Easton · Brooklyn · Charli",
      familyDetail:
        "Married to Lyndsey. They have three children, Easton, Brooklyn, and Charli. Before coaching he pitched at Barton Community College from 2002–2004, signed a letter of intent with the University of Nebraska, and was selected by the Boston Red Sox in the 11th round of the 2004 MLB Draft.",
      history:
        "He began his coaching career at Southmoore as an assistant for five years. In 2013 he became the head coach at Edmond Santa Fe and led that program for nine years, winning a Class 6A state championship in 2019 — the first in school history — and finishing runner-up in 2022, before coming to Yukon in 2022. This is his 18th year coaching and his fifth season as Yukon’s head coach, and in his first four years the Millers have reached the semifinals twice.",
      whyYukon:
        "He and his family have found a home in Yukon. He believes it is a great place to raise a family and values the pride that comes from one high school representing one community. The tradition and history of Yukon, and the support of the administration, players, families, and community, are a major part of what makes coaching the Millers special to him.",
    },
  },
  {
    id: "furlong",
    name: "Jason Furlong",
    role: "Assistant Coach",
    photo: "/images/coaches/jason-furlong-dugout.jpg",
    bio: {
      yearsCoaching: "11",
      family: "Lindsey · Kaylee · Mason",
      familyDetail:
        "Married to Lindsey since 2018. They have been together since 2008 — middle school sweethearts. Two children, Kaylee (6) and Mason (2), and two dogs, Pistol and Minnie. He grew up in Tulsa, attended Bixby High School, and attended the University of Central Oklahoma.",
      history:
        "He began coaching in the 2016–17 season at Bishop McGuinness as the head freshman coach and head strength and conditioning coach. He came to Yukon in 2018–19 as a freshman assistant and strength and conditioning coordinator, and he has been here ever since. He now serves as the varsity pitching coach.",
      whyYukon:
        "He loves the community around the Yukon Millers, the support across town, and the culture this program has built and is still building.",
    },
  },
  {
    id: "lockett",
    name: "Clay Lockett",
    role: "Assistant Coach · Strength and Conditioning Coach",
    photo: "/images/coaches/clay-lockett.jpg",
    bio: {
      yearsCoaching: "4",
      family: "Karsyn",
      familyDetail:
        "Married Karsyn in 2025. They have two dogs, Kobe and Luna. He graduated from Putnam City North High School, began his college career at Barton Community College, then continued at Northern Oklahoma College–Enid, where he was part of the 2019 national championship team. He later attended Southern Nazarene University and graduated from the University of Arkansas at Monticello with a bachelor’s in Business Management and a master’s in Physical Education and Coaching.",
      history:
        "He has been coaching at Yukon since 2023 and is entering his fourth year. He primarily works with the infielders and hitters.",
      whyYukon:
        "His favorite part of Yukon is the support from the community, the players’ parents, and the buy-in from the boys year in and year out.",
    },
  },
  {
    id: "haines",
    name: "Dakota Haines",
    role: "Assistant Coach",
    photo: "/images/coaches/dakota-haines.jpg",
    bio: {
      yearsCoaching: "13",
      family: "Kendall · Dax",
      familyDetail:
        "Married Kendall in December 2016. They have one son, Dax. He graduated from Harrah High School, then played at Coffeyville Community College, Benedictine College, and Southwestern Oklahoma State.",
      history:
        "After his playing career he joined the SWOSU staff as a graduate assistant, then came to Yukon in the spring of 2014. He spent five seasons here as an assistant before becoming the head coach at Southmoore. He returned to Yukon in the summer of 2023 as an assistant coach. This is his 13th year coaching and his ninth at Yukon.",
      whyYukon:
        "What he enjoys most is the community support — how welcoming the city and the people are.",
    },
  },
  {
    id: "teel",
    name: "Caleb Teel",
    role: "Assistant Coach",
    photo: "/images/coaches/caleb-teel.jpg",
    bio: {
      yearsCoaching: "11",
      family: "Kyra · Collins · Quinn · Kellen",
      familyDetail:
        "Married Kyra in December 2016. They have three kids, Collins, Quinn, and Kellen. He began his college career at Seminole State, then was a two-year starter at Southern Nazarene University before a knee injury cut his senior season short.",
      history:
        "After graduation he began coaching at Edmond Santa Fe, spent six seasons there, and won a state championship as an assistant in 2019. He was the head coach at Moore High School for two seasons (2023–2024). He is entering his third season at Yukon.",
      whyYukon:
        "His favorite thing about Yukon is how much the community cares about Yukon athletics.",
    },
  },
  {
    id: "booth",
    name: "Zac Booth",
    role: "Assistant Coach",
    photo: "/images/coaches/zac-booth.jpg",
    bio: {
      yearsCoaching: "18",
      family: "Madelyn · Ella",
      familyDetail:
        "Two daughters, Madelyn (23), working on her doctorate at Oklahoma City University, and Ella (20), studying interior design at Oklahoma State, and two dogs, Vader and Kylo. He is a graduate of Elk City High School and spent five seasons as a pitcher at Southwestern Oklahoma State in Weatherford.",
      history:
        "He began his coaching career in 1999 at Duncanville High School in Duncanville, Texas, as the head freshman coach. He became the head baseball coach at Watonga, Oklahoma, in 2005. After time in the oil field, he returned to coaching and joined the Yukon program in 2020.",
      whyYukon:
        "He loves being a Miller — one city, one school, one team. Miller Nation. Red Kingdom.",
    },
  },
  {
    id: "knutson",
    name: "Ryan Knutson",
    role: "Assistant Coach",
    photo: "/images/coaches/ryan-knutson.jpg",
    bio: {
      yearsCoaching: "4",
      family: "",
      familyDetail:
        "His girlfriend is Isabella. They do not have any pets. They enjoy working out, cooking, and spending time with friends and family. He holds a bachelor’s degree in History Education with a minor in Educational Research from UCO. He is working on a Master of Science in Athletic Administration — Educational Leadership at Southeastern Oklahoma State University.",
      history:
        "He started at Yukon in the 2022–23 season and has been here ever since. This is his fourth year of coaching.",
      whyYukon:
        "He is very thankful for Yukon because it provided a lot of firsts in his professional career. All he knows is Yukon, both as an educator and a coach. He loves Yukon because it is a place where he can continue to grow as a professional on and off the field.",
    },
  },
  {
    id: "ray",
    name: "Damien Ray",
    role: "Assistant Coach",
    bio: {
      yearsCoaching: "7",
      family: "Jerzey · Everly",
      familyDetail:
        "Married to Jerzey. They have been together for seven years and celebrated their first wedding anniversary on July 17. They have a 12-year-old daughter, Everly, and three dogs — Mini, Gunner, and Goose. Born and raised in Altus, Oklahoma, he attended Altus High School and played three years at Western Oklahoma State College.",
      history:
        "Coach Ray enters his first season with the Yukon Millers, bringing seven years of coaching experience at the high school and collegiate levels. He began his coaching career in 2019 at Western Oklahoma State College, spending two years on staff at the program where he had played and helping the Pioneers to a National Runner-Up finish. He then spent one year at Santa Fe South High School and three years at Norman North High School before joining Yukon High School for his first season with the Millers.",
      whyYukon:
        "For Coach Ray, baseball is about much more than what happens between the lines. He values building relationships with players, developing young men, competing the right way, and creating a culture that players are proud to represent. He loves the strong sense of community surrounding the Yukon Millers and the support the program receives throughout town. He is excited to be part of a Miller Baseball culture built on pride, tradition, hard work, and representing Yukon the right way, and looks forward to helping continue that foundation and making a positive impact on the players, program, and community.",
    },
  },
];

export const supportStaff: Coach[] = [
  {
    id: "woodruff",
    name: "Scotlyn Woodruff",
    role: "Manager",
    photo: "/images/coaches/scotlyn-woodruff.jpg",
  },
  {
    id: "matadamas",
    name: "Yoslin Matadamas",
    role: "Manager",
    photo: "/images/coaches/yoslin-matadamas.jpg",
  },
  {
    id: "jones",
    name: "Breed Jones",
    role: "Student Assistant",
    photo: "/images/coaches/breed-jones.jpg",
  },
  {
    id: "hormier",
    name: "Londyn Carter",
    role: "Student Social Media",
    photo: "/images/coaches/londyn-hormier.jpg",
  },
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
