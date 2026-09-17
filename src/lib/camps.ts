export const campRegistrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0XUBtP7f2KoVQCCuArpfWgZ2QXNKkm77Ifhi8rwu5QAMxEg/viewform?usp=header";

export const fallCamps = {
  title: "Yukon Miller Fall Baseball Camps",
  ages: "Ages 7–12",
  note: "A spot is not secure until payment is made. Camp capacity is limited.",
  twoCampNote:
    "Registering for two camps? Fill out a second registration. The all-three price is the only package discount. Sessions that stack have a 30-minute gap for lunch — no concession stand.",
  coachEmail: "ryan.phillips@yukonps.com",
  flyerSrc: "/images/camps/fall-camps-flyer.jpg",
  flyerAlt:
    "Yukon Miller Fall Baseball Camps flyer for ages 7–12, October 12–13 at Miller Field",
  qrSrc: "/images/camps/fall-register-qr.png",
  qrAlt: "QR code that opens the Yukon Miller Fall Baseball Camps registration form",
  pdfHref: "/yukon-fall-baseball-camps.pdf",
  location: {
    name: "Miller Field",
    street: "1777 S Yukon Parkway",
    cityStateZip: "Yukon, OK 73099",
    detail: "Behind Yukon High School",
  },
  payment: {
    venmo: "@ryanphillipsBC",
    checkTo: "Ryan Phillips Baseball Camps",
    methods: [
      "Venmo @ryanphillipsBC",
      "Cash",
      "Check payable to Ryan Phillips Baseball Camps",
    ],
  },
  sessions: [
    {
      id: "infield-outfield",
      name: "Infield / Outfield Camp",
      dates: "October 12",
      time: "10:00–11:30 a.m.",
      price: "$40",
      cap: "Limited to 20 players",
    },
    {
      id: "pitching",
      name: "Pitching Camp",
      dates: "October 13",
      time: "10:00–11:30 a.m.",
      price: "$40",
      cap: "Limited to 20 players",
    },
    {
      id: "hitting",
      name: "Hitting Camp",
      dates: "October 12 & 13",
      time: "12:00–1:30 p.m.",
      price: "$70",
      cap: "Limited to 30 players",
    },
    {
      id: "all-three",
      name: "All Three Camps",
      dates: "October 12 & 13",
      time: "Both sessions each day",
      price: "$130",
      cap: "Package price — register once",
    },
  ],
} as const;
