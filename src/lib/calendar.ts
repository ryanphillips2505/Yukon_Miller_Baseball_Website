import {
  games,
  isAwayGame,
  phaseLabel,
  versusLabel,
  type Game,
} from "@/lib/schedule";
import { program, teams, type TeamId } from "@/lib/site";

export const calendarTeamIds = teams.map((team) => team.id);

export function isCalendarTeam(value: string): value is TeamId {
  return calendarTeamIds.includes(value as TeamId);
}

export function parseCalendarTeamParam(value: string): TeamId | undefined {
  const slug = value.replace(/\.ics$/i, "").toLowerCase();
  return isCalendarTeam(slug) ? slug : undefined;
}

export function calendarFileName(team: TeamId) {
  return `${team}.ics`;
}

export function calendarPath(team: TeamId) {
  return `/calendar/${calendarFileName(team)}`;
}

export function teamCalendarName(team: TeamId) {
  const label = teams.find((entry) => entry.id === team)?.label ?? team;
  return `Yukon ${label} Baseball`;
}

export function calendarPublicOrigin(origin?: string) {
  const resolved =
    origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://www.yukonbaseball.com");
  try {
    const url = new URL(resolved);
    if (url.hostname === "yukonbaseball.com") {
      url.hostname = "www.yukonbaseball.com";
    }
    return url.origin;
  } catch {
    return "https://www.yukonbaseball.com";
  }
}

export function calendarHttpsUrl(team: TeamId, origin?: string) {
  return `${calendarPublicOrigin(origin)}${calendarPath(team)}`;
}

export function calendarSubscribeLinks(
  team: TeamId,
  origin = "https://www.yukonbaseball.com",
) {
  const httpsUrl = calendarHttpsUrl(team, origin);
  const webcal = httpsUrl.replace(/^https?:/, "webcal:");
  return {
    httpsUrl,
    apple: webcal,
    google: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(httpsUrl)}`,
    outlook: webcal,
  };
}

function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldLine(line: string) {
  if (line.length <= 75) return line;
  let output = line.slice(0, 75);
  let rest = line.slice(75);
  while (rest.length > 0) {
    output += `\r\n ${rest.slice(0, 74)}`;
    rest = rest.slice(74);
  }
  return output;
}

function icsDocument(lines: string[]) {
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatStamp(date: Date) {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function localDateTime(date: string, hours: number, minutes: number) {
  const compact = date.replaceAll("-", "");
  return `${compact}T${pad(hours)}${pad(minutes)}00`;
}

function addMinutes(
  hours: number,
  minutes: number,
  extra: number,
): { hours: number; minutes: number; dayOffset: number } {
  const total = hours * 60 + minutes + extra;
  const dayOffset = Math.floor(total / (24 * 60));
  const clock = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  return {
    hours: Math.floor(clock / 60),
    minutes: clock % 60,
    dayOffset,
  };
}

function shiftDate(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return [
    next.getUTCFullYear(),
    pad(next.getUTCMonth() + 1),
    pad(next.getUTCDate()),
  ].join("-");
}

function parseClock(clock: string) {
  const match = clock.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return undefined;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours >= 1 && hours <= 8) hours += 12;
  return { hours, minutes };
}

export function gameStartClocks(time?: string) {
  if (!time || time.toUpperCase() === "TBD") return [];
  return time
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .map(parseClock)
    .filter((clock): clock is { hours: number; minutes: number } =>
      Boolean(clock),
    );
}

function gameLocation(game: Game) {
  if (game.venue) return game.venue;
  if (!isAwayGame(game.location)) {
    return `Miller Field, ${program.street}, ${program.cityStateZip}`;
  }
  return game.opponent;
}

function gameSummary(game: Game, startLabel?: string) {
  const team = teams.find((entry) => entry.id === game.team)?.label ?? "Yukon";
  const matchup = `${versusLabel(game.location)} ${game.opponent}`;
  if (startLabel) return `${team}: ${matchup} · ${startLabel}`;
  return `${team}: ${matchup}`;
}

function gameDescription(game: Game, startLabel?: string) {
  const lines = [
    `Yukon Miller Baseball — ${teams.find((entry) => entry.id === game.team)?.label ?? "Team"}`,
    phaseLabel[game.phase],
    `${versusLabel(game.location)} ${game.opponent}`,
    startLabel
      ? `First pitch ${startLabel}`
      : "Time TBA — placeholder 8:00 AM–5:00 PM. Confirm on yukonbaseball.com/schedule",
    game.venue ? `Venue: ${game.venue}` : undefined,
    "Reminder: 30 minutes before first pitch.",
    "This subscribed calendar updates when the website schedule changes.",
    "https://www.yukonbaseball.com/schedule",
  ];
  return lines.filter(Boolean).join("\n");
}

type CalendarEvent = {
  uid: string;
  summary: string;
  description: string;
  location: string;
  start: string;
  end: string;
  stamp: string;
  sequence: number;
};

function contentStamp(parts: string[]) {
  let hash = 2166136261;
  const input = parts.join("|");
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const seconds = 1_767_225_600 + ((hash >>> 0) % 126_230_400);
  return formatStamp(new Date(seconds * 1000));
}

function eventLines(event: CalendarEvent) {
  return [
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${event.stamp}`,
    `LAST-MODIFIED:${event.stamp}`,
    `SEQUENCE:${event.sequence}`,
    `DTSTART;TZID=America/Chicago:${event.start}`,
    `DTEND;TZID=America/Chicago:${event.end}`,
    `SUMMARY:${escapeText(event.summary)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "X-MICROSOFT-CDO-BUSYSTATUS:BUSY",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(`${event.summary} starts in 30 minutes`)}`,
    "TRIGGER:-PT30M",
    `UID:alarm-${event.uid}`,
    `X-WR-ALARMUID:alarm-${event.uid}`,
    "END:VALARM",
    "END:VEVENT",
  ];
}

function eventsForGame(game: Game): CalendarEvent[] {
  const clocks = gameStartClocks(game.time);
  const placeholder = clocks.length === 0;
  const starts = placeholder ? [{ hours: 8, minutes: 0 }] : clocks;
  const location = gameLocation(game);
  const duration = placeholder ? 9 * 60 : starts.length > 1 ? 110 : 120;

  return starts.map((clock, index) => {
    const startLabel = placeholder
      ? undefined
      : game.time
          ?.split("/")
          .map((part) => part.trim())
          .filter(Boolean)[index];
    const end = addMinutes(clock.hours, clock.minutes, duration);
    const endDate = shiftDate(game.date, end.dayOffset);
    const start = localDateTime(game.date, clock.hours, clock.minutes);
    const endStamp = localDateTime(endDate, end.hours, end.minutes);
    const summary = gameSummary(game, startLabel);
    const description = gameDescription(game, startLabel);
    const stamp = contentStamp([
      game.id,
      game.date,
      game.time ?? "",
      start,
      endStamp,
      summary,
      location,
    ]);
    return {
      uid: `${game.id}-${index + 1}@yukonbaseball.com`,
      summary,
      description,
      location,
      start,
      end: endStamp,
      stamp,
      sequence: Number(start.replace(/\D/g, "").slice(0, 12)),
    };
  });
}

const chicagoZone = [
  "BEGIN:VTIMEZONE",
  "TZID:America/Chicago",
  "X-LIC-LOCATION:America/Chicago",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0600",
  "TZOFFSETTO:-0500",
  "TZNAME:CDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0600",
  "TZNAME:CST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

export function teamCalendarIcs(team: TeamId) {
  const list = games.filter((game) => game.team === team);
  const events = list.flatMap(eventsForGame);
  const name = teamCalendarName(team);
  return icsDocument([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yukon Miller Baseball//Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(name)}`,
    "X-WR-TIMEZONE:America/Chicago",
    `X-WR-CALDESC:${escapeText(`${name}. Reminder 30 minutes before first pitch. This feed updates when the website schedule changes.`)}`,
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
    ...chicagoZone,
    ...events.flatMap(eventLines),
    "END:VCALENDAR",
  ]);
}
