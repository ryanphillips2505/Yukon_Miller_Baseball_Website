export type Coach = {
  id: string;
  name: string;
  role: string;
  photo?: string;
};

export const coaches: Coach[] = [
  { id: "phillips", name: "Ryan Phillips", role: "Head Coach" },
  { id: "furlong", name: "Jason Furlong", role: "Assistant Coach" },
  { id: "lockett", name: "Clay Lockett", role: "Assistant Coach" },
  { id: "haines", name: "Dakota Haines", role: "Assistant Coach" },
  { id: "teel", name: "Caleb Teel", role: "Assistant Coach" },
  { id: "booth", name: "Zac Booth", role: "Assistant Coach" },
  { id: "knutson", name: "Ryan Knutson", role: "Assistant Coach" },
  { id: "ray", name: "Damien Ray", role: "Assistant Coach" },
];

export const managersNote =
  "Managers and trainers will post here once the staff list for the next season is set.";
