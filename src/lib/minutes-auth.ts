import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  MINUTES_EXPIRED_MESSAGE,
  MINUTES_IDLE_MS,
  isIdleExpired,
} from "@/lib/minutes-session";

export const MINUTES_COOKIE = "ym_minutes";
export type MinutesRole = "view" | "admin";

const DEFAULT_PASSWORD = "yukonmillers";
const DEFAULT_ADMIN_PASSWORD = "yukonadmin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export type MinutesAccess =
  | {
      state: "active";
      role: MinutesRole;
      lastActivity: number;
      absoluteExp: number;
    }
  | { state: "anonymous" }
  | { state: "expired" };

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

function roleFrom(value: string): MinutesRole | null {
  if (value === "admin") return "admin";
  if (value === "view" || value === "ok") return "view";
  return null;
}

function encodeSession(role: MinutesRole, absoluteExp: number, lastActivity: number) {
  const payload = `${role}.${absoluteExp}.${lastActivity}`;
  return `${payload}.${sign(payload)}`;
}

export function createMinutesSession(role: MinutesRole, now = Date.now()) {
  return encodeSession(role, now + SESSION_MS, now);
}

export function readMinutesSession(
  value: string | undefined,
  now = Date.now(),
): MinutesAccess {
  if (!value) return { state: "anonymous" };
  const lastDot = value.lastIndexOf(".");
  if (lastDot < 1) return { state: "anonymous" };
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return { state: "anonymous" };

  const parts = payload.split(".");
  if (parts.length === 2) {
    const role = roleFrom(parts[0] ?? "");
    const exp = Number(parts[1]);
    if (!role || !Number.isFinite(exp) || now > exp) return { state: "anonymous" };
    return { state: "expired" };
  }
  if (parts.length !== 3) return { state: "anonymous" };

  const role = roleFrom(parts[0] ?? "");
  const absoluteExp = Number(parts[1]);
  const lastActivity = Number(parts[2]);
  if (!role || !Number.isFinite(absoluteExp) || !Number.isFinite(lastActivity)) {
    return { state: "anonymous" };
  }
  if (now > absoluteExp || isIdleExpired(lastActivity, now)) return { state: "expired" };
  return { state: "active", role, lastActivity, absoluteExp };
}

export function minutesRoleFromSession(
  value: string | undefined,
  now = Date.now(),
): MinutesRole | null {
  const access = readMinutesSession(value, now);
  return access.state === "active" ? access.role : null;
}

export function resolveMinutesRole(input: unknown): MinutesRole | null {
  if (typeof input !== "string" || input.length === 0) return null;
  const admin = passwordMatches(input, minutesAdminPassword());
  const view = passwordMatches(input, minutesPassword());
  if (admin) return "admin";
  if (view) return "view";
  return null;
}

export function minutesCookieOptions(maxAgeSeconds = MINUTES_IDLE_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

async function cookieValue() {
  const jar = await cookies();
  return jar.get(MINUTES_COOKIE)?.value;
}

export async function minutesAccess(now = Date.now()) {
  return readMinutesSession(await cookieValue(), now);
}

export async function clearMinutesCookie() {
  const jar = await cookies();
  jar.set(MINUTES_COOKIE, "", { ...minutesCookieOptions(0), maxAge: 0 });
}

export async function recordMinutesActivity(now = Date.now()) {
  const access = await minutesAccess(now);
  if (access.state !== "active") return access;
  const remainingMs = access.absoluteExp - now;
  if (remainingMs <= 0) return { state: "expired" } as const;
  const jar = await cookies();
  jar.set(
    MINUTES_COOKIE,
    encodeSession(access.role, access.absoluteExp, now),
    minutesCookieOptions(Math.min(MINUTES_IDLE_MS, remainingMs) / 1000),
  );
  return {
    state: "active" as const,
    role: access.role,
    lastActivity: now,
    absoluteExp: access.absoluteExp,
  };
}

export function minutesDeniedResponse(access: MinutesAccess) {
  if (access.state === "expired") {
    return NextResponse.json(
      { error: MINUTES_EXPIRED_MESSAGE, expired: true },
      { status: 401 },
    );
  }
  return NextResponse.json({ error: "Sign in required." }, { status: 401 });
}

export async function requireMinutes(options?: {
  touch?: boolean;
  admin?: boolean;
  adminError?: string;
}) {
  let access = await minutesAccess();
  if (access.state !== "active") {
    if (access.state === "expired") await clearMinutesCookie();
    return { access, response: minutesDeniedResponse(access) };
  }
  if (options?.admin && access.role !== "admin") {
    return {
      access,
      response: NextResponse.json(
        { error: options.adminError ?? "Admin sign-in required." },
        { status: 403 },
      ),
    };
  }
  if (options?.touch) {
    access = await recordMinutesActivity();
    if (access.state !== "active") {
      if (access.state === "expired") await clearMinutesCookie();
      return { access, response: minutesDeniedResponse(access) };
    }
  }
  return { access, response: null };
}

export async function minutesRole() {
  const access = await minutesAccess();
  return access.state === "active" ? access.role : null;
}

export async function minutesAuthed() {
  return (await minutesRole()) !== null;
}

export async function minutesAdmin() {
  return (await minutesRole()) === "admin";
}
