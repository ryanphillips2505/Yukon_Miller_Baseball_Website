export type Coach = {
  id: string;
  name: string;
  role: string;
  photo?: string;
};

export const coaches: Coach[] = [
  { id: "phillips", name: "Ryan Phillips", role: "Head Coach" },
  { id: "lowmiller", name: "Coach Lowmiller", role: "Assistant Coach" },
  { id: "pearson", name: "Coach Pearson", role: "Assistant Coach" },
  { id: "furlong", name: "Coach Furlong", role: "Assistant Coach" },
  { id: "haines", name: "Coach Haines", role: "Assistant Coach" },
  { id: "gaughan", name: "Coach Gaughan", role: "Assistant Coach" },
  { id: "lockett", name: "Coach Lockett", role: "Assistant Coach" },
  { id: "booth", name: "Coach Booth", role: "Assistant Coach" },
  { id: "knutson", name: "Coach Knutson", role: "Assistant Coach" },
];

export const managersNote =
  "Managers and trainers will post here once the staff list for the next season is set.";
