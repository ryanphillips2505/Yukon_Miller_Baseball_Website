import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const MINUTES_COOKIE = "ym_minutes";
export type MinutesRole = "view" | "admin";

const DEFAULT_PASSWORD = "yukonmillers";
const DEFAULT_ADMIN_PASSWORD = "yukonadmin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function minutesPassword() {
  return process.env.MINUTES_PASSWORD || DEFAULT_PASSWORD;
}

function minutesAdminPassword() {
  return process.env.MINUTES_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function minutesSecret() {
  return (
    process.env.MINUTES_SECRET ||
    `ym-minutes:${minutesPassword()}:${minutesAdminPassword()}`
  );
}

function sign(payload: string) {
  return createHmac("sha256", minutesSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

function passwordMatches(input: string, expected: string) {
  return safeEqual(input.normalize("NFC"), expected.normalize("NFC"));
}

export function createMinutesSession(role: MinutesRole) {
  const exp = Date.now() + SESSION_MS;
  const payload = `${role}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function minutesRoleFromSession(
  value: string | undefined,
): MinutesRole | null {
  if (!value) return null;
  const lastDot = value.lastIndexOf(".");
  if (lastDot < 1) return null;
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return null;
  const sep = payload.lastIndexOf(".");
  if (sep < 1) return null;
  const role = payload.slice(0, sep);
  const exp = Number(payload.slice(sep + 1));
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  if (role === "admin") return "admin";
  if (role === "view" || role === "ok") return "view";
  return null;
}

export function resolveMinutesRole(input: unknown): MinutesRole | null {
  if (typeof input !== "string" || input.length === 0) return null;
  const admin = passwordMatches(input, minutesAdminPassword());
  const view = passwordMatches(input, minutesPassword());
  if (admin) return "admin";
  if (view) return "view";
  return null;
}

export function minutesCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}

export async function minutesRole() {
  const jar = await cookies();
  return minutesRoleFromSession(jar.get(MINUTES_COOKIE)?.value);
}

export async function minutesAuthed() {
  return (await minutesRole()) !== null;
}

export async function minutesAdmin() {
  return (await minutesRole()) === "admin";
}
