import { program } from "@/lib/site";
import { isAwayGame, type Game } from "@/lib/schedule";

export type Field = {
  name: string;
  street: string;
  cityStateZip: string;
};

export const millerField: Field = {
  name: "Miller Field",
  street: program.street,
  cityStateZip: program.cityStateZip,
};

const fields: Record<string, Field> = {
  choctaw: {
    name: "Choctaw High School",
    street: "14300 NE 10th Street",
    cityStateZip: "Choctaw, OK 73020",
  },
  "choctaw-tournament": {
    name: "Choctaw High School",
    street: "14300 NE 10th Street",
    cityStateZip: "Choctaw, OK 73020",
  },
  "santa-fe": {
    name: "Edmond Santa Fe High School",
    street: "1901 W 15th Street",
    cityStateZip: "Edmond, OK 73013",
  },
  "santa-fe-festival": {
    name: "Edmond Santa Fe High School",
    street: "1901 W 15th Street",
    cityStateZip: "Edmond, OK 73013",
  },
  "norman-north": {
    name: "Norman North Tull Lake Field",
    street: "1809 Stubbeman Avenue",
    cityStateZip: "Norman, OK 73069",
  },
  mustang: {
    name: "Mustang High School",
    street: "300 W Juniper Drive",
    cityStateZip: "Mustang, OK 73064",
  },
  "edmond-north": {
    name: "Edmond North High School",
    street: "215 W Danforth Road",
    cityStateZip: "Edmond, OK 73003",
  },
  westmoore: {
    name: "Westmoore High School",
    street: "12613 S Western Avenue",
    cityStateZip: "Oklahoma City, OK 73170",
  },
  southmoore: {
    name: "Southmoore High School",
    street: "2901 S Santa Fe Avenue",
    cityStateZip: "Moore, OK 73160",
  },
  moore: {
    name: "Moore High School",
    street: "3000 Easter Avenue",
    cityStateZip: "Moore, OK 73160",
  },
  "deer-creek": {
    name: "Deer Creek High School",
    street: "6101 NW 206th Street",
    cityStateZip: "Edmond, OK 73012",
  },
  "putnam-city-north": {
    name: "Putnam City North High School",
    street: "11800 N Rockwell Avenue",
    cityStateZip: "Oklahoma City, OK 73162",
  },
  pco: {
    name: "PCO High School",
    street: "5300 NW 50th Street",
    cityStateZip: "Warr Acres, OK 73122",
  },
  memorial: {
    name: "Central Middle School",
    street: "500 E 9th Street",
    cityStateZip: "Edmond, OK 73034",
  },
  "edmond-memorial": {
    name: "Central Middle School",
    street: "500 E 9th Street",
    cityStateZip: "Edmond, OK 73034",
  },
  bixby: {
    name: "Bixby High School",
    street: "601 S Riverview Drive",
    cityStateZip: "Bixby, OK 74008",
  },
  "piedmont-jv-festival": {
    name: "Piedmont High School",
    street: "1055 Edmond Road NW",
    cityStateZip: "Piedmont, OK 73078",
  },
  "union-festival": {
    name: "Union High School Freshman Academy",
    street: "7616 S Garnett Road",
    cityStateZip: "Broken Arrow, OK 74012",
  },
  "kingfisher-jv-festival": {
    name: "Kingfisher High School",
    street: "1500 S 13th Street",
    cityStateZip: "Kingfisher, OK 73750",
  },
  "carl-albert-tournament": {
    name: "Carl Albert High School",
    street: "2009 S Post Road",
    cityStateZip: "Midwest City, OK 73130",
  },
  enid: {
    name: "David Allen Memorial Ballpark",
    street: "301 S Grand Avenue",
    cityStateZip: "Enid, OK 73701",
  },
  "enid-festival": {
    name: "David Allen Memorial Ballpark",
    street: "301 S Grand Avenue",
    cityStateZip: "Enid, OK 73701",
  },
};

const venues: Record<string, Field> = {
  oru: {
    name: "J.L. Johnson Stadium",
    street: "7777 S Lewis Avenue",
    cityStateZip: "Tulsa, OK 74171",
  },
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function fieldForGame(game: Game): Field | undefined {
  if (game.venue) {
    return venues[slug(game.venue)];
  }
  if (!isAwayGame(game.location)) {
    return millerField;
  }
  return fields[slug(game.opponent)];
}

export function mapsUrlForField(field: Field) {
  const query = `${field.name}, ${field.street}, ${field.cityStateZip}`;
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

export function fieldLabel(field: Field) {
  return `${field.name}, ${field.street}, ${field.cityStateZip}`;
}
