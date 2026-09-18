export type Coach = {
  id: string;
  name: string;
  role: string;
  photo?: string;
};

export const coaches: Coach[] = [
  { id: "phillips", name: "Ryan Phillips", role: "Head Coach", photo: "/images/coaches/ryan-phillips.jpg" },
  { id: "furlong", name: "Jason Furlong", role: "Assistant Coach", photo: "/images/coaches/jason-furlong.jpg" },
  { id: "lockett", name: "Clay Lockett", role: "Assistant Coach", photo: "/images/coaches/clay-lockett.jpg" },
  { id: "haines", name: "Dakota Haines", role: "Assistant Coach", photo: "/images/coaches/dakota-haines.jpg" },
  { id: "teel", name: "Caleb Teel", role: "Assistant Coach", photo: "/images/coaches/caleb-teel.jpg" },
  { id: "booth", name: "Zac Booth", role: "Assistant Coach", photo: "/images/coaches/zac-booth.jpg" },
  { id: "knutson", name: "Ryan Knutson", role: "Assistant Coach" },
  { id: "ray", name: "Damien Ray", role: "Assistant Coach" },
];

export const supportStaff: Coach[] = [
  { id: "woodruff", name: "Scotlyn Woodruff", role: "Manager" },
  { id: "matadamas", name: "Yoslin Matadamas", role: "Manager" },
  { id: "jones", name: "Breed Jones", role: "Student Assistant" },
  { id: "hormier", name: "Londyn Hormier", role: "Student Social Media" },
];
