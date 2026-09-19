import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const MINUTES_COOKIE = "ym_minutes";

const DEFAULT_PASSWORD = "yukonmillers";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function minutesPassword() {
  return process.env.MINUTES_PASSWORD || DEFAULT_PASSWORD;
}

function minutesSecret() {
  return process.env.MINUTES_SECRET || `ym-minutes:${minutesPassword()}`;
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

export function createMinutesSession() {
  const exp = Date.now() + SESSION_MS;
  const payload = `ok.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyMinutesSession(value: string | undefined) {
  if (!value) return false;
  const lastDot = value.lastIndexOf(".");
  if (lastDot < 1) return false;
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const exp = Number(payload.slice(payload.lastIndexOf(".") + 1));
  return Number.isFinite(exp) && Date.now() <= exp;
}

export function checkMinutesPassword(input: unknown) {
  if (typeof input !== "string" || input.length === 0) return false;
  return safeEqual(input.normalize("NFC"), minutesPassword().normalize("NFC"));
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

export async function minutesAuthed() {
  const jar = await cookies();
  return verifyMinutesSession(jar.get(MINUTES_COOKIE)?.value);
}
