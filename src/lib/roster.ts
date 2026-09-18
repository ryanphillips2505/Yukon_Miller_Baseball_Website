export type Hand = "L" | "R";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  bats?: Hand;
  throws?: Hand;
  gradYear?: number;
  position?: string;
  photo?: string;
};

const programPlayers: Omit<Player, "id">[] = [
  { firstName: "Kooper", lastName: "Allen", bats: "L", throws: "L", gradYear: 2029 },
  { firstName: "Gabriel", lastName: "Alvarado Holland", bats: "R", throws: "L", gradYear: 2030 },
  { firstName: "Colten", lastName: "Bentley", bats: "L", throws: "L", gradYear: 2030 },
  { firstName: "Graham", lastName: "Blair", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Owen", lastName: "Blair", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Boston", lastName: "Campeotto", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Nathan", lastName: "Clark", bats: "L", throws: "L", gradYear: 2027 },
  { firstName: "Charles", lastName: "Copus", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Kamron", lastName: "Cox", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Canon", lastName: "Dekinder", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Eli", lastName: "Downing", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Julian", lastName: "Escobar", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Cooper", lastName: "Ferrell", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Gunner", lastName: "Fletcher", bats: "L", throws: "L", gradYear: 2027 },
  { firstName: "Cade", lastName: "Geiger", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Brennan", lastName: "Gray", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Nicolas", lastName: "Guerrero", bats: "L", throws: "L", gradYear: 2029 },
  { firstName: "Sutton", lastName: "Hall", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Jayden", lastName: "Henderson", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Greyson", lastName: "Henley", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Carlos", lastName: "Hernandez", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Jude", lastName: "Hinten", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Blaine", lastName: "Hollingshead", bats: "L", throws: "R", gradYear: 2028 },
  { firstName: "Kamden", lastName: "Hotz", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Payson", lastName: "Jarvis", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Lucas", lastName: "Jellison", bats: "L", throws: "R" },
  { firstName: "Jake", lastName: "Johnson", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Edmund", lastName: "Jones", gradYear: 2030 },
  { firstName: "Wyatt", lastName: "Jones", bats: "R", throws: "R" },
  { firstName: "Zayden", lastName: "Khalil", bats: "R", throws: "R" },
  { firstName: "Preston", lastName: "Klose", bats: "R", throws: "R" },
  { firstName: "Damien", lastName: "Leal", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Jackson", lastName: "Martinez", bats: "R", throws: "R" },
  { firstName: "Jackson", lastName: "Massar", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Jordan", lastName: "Massar", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Pryce", lastName: "McClure", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Chance", lastName: "McPherson", bats: "R", throws: "R" },
  { firstName: "Wiley", lastName: "Moery", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Riley", lastName: "Molloy", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Luke", lastName: "Moy", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Kyson", lastName: "Nemecek", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Brantley", lastName: "Odom", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Drake", lastName: "Pace", bats: "R", throws: "L", gradYear: 2027 },
  { firstName: "Daxton", lastName: "Pierson", bats: "L", throws: "L", gradYear: 2027 },
  { firstName: "Jacoby", lastName: "Prentice", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Hunter", lastName: "Rule", bats: "R", throws: "R", gradYear: 2029 },
  { firstName: "Cade", lastName: "Rush", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Cole", lastName: "Schmidt", bats: "R", throws: "R", gradYear: 2028 },
  { firstName: "Caleb", lastName: "Schneider", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Jackson", lastName: "Sevier", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Jake", lastName: "Stein", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Clayton", lastName: "Strange", bats: "R", throws: "R", gradYear: 2027 },
  { firstName: "Raden", lastName: "Warford", bats: "R", throws: "R", gradYear: 2030 },
  { firstName: "Koda", lastName: "Fish", bats: "R", throws: "R" },
  { firstName: "Vince", lastName: "Yanda", bats: "R", throws: "R" },
  { firstName: "Rhys", lastName: "Hampton", bats: "R", throws: "R" },
];

function playerId(player: Omit<Player, "id">) {
  return `${player.lastName}-${player.firstName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const players: Player[] = programPlayers
  .map((player) => ({ ...player, id: playerId(player) }))
  .sort((a, b) => {
    const last = a.lastName.localeCompare(b.lastName, "en", {
      sensitivity: "base",
    });
    if (last !== 0) return last;
    return a.firstName.localeCompare(b.firstName, "en", { sensitivity: "base" });
  });

export function displayName(player: Player) {
  return `${player.lastName}, ${player.firstName}`;
}

export function fullName(player: Player) {
  return `${player.firstName} ${player.lastName}`;
}

export function playerIndex(id: string, list: Player[] = players) {
  return list.findIndex((player) => player.id === id);
}

export function adjacentPlayer(
  id: string,
  direction: -1 | 1,
  list: Player[] = players,
) {
  const index = playerIndex(id, list);
  if (index < 0 || list.length === 0) return undefined;
  return list[(index + direction + list.length) % list.length];
}

export function bioValue(value?: string | number) {
  if (value === undefined || value === "") return "—";
  return String(value);
}

export function rosterGroups(list: Player[] = players) {
  const groups = new Map<string, Player[]>();
  for (const player of list) {
    const letter = player.lastName[0]?.toUpperCase() ?? "#";
    const bucket = groups.get(letter) ?? [];
    bucket.push(player);
    groups.set(letter, bucket);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}
