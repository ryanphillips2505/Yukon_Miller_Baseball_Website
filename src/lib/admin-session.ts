import { ADMIN_COOKIE } from "@/lib/admin-constants";
import { createHmac, timingSafeEqual } from "crypto";

export { ADMIN_COOKIE };
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function adminPassword() {
  return (
    process.env.ADMIN_PASSWORD ||
    process.env.MINUTES_ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "production" ? "" : "yukonadmin")
  );
}

export function adminSecret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.MINUTES_SECRET ||
    `ym-command:${adminPassword()}`
  );
}

function sign(payload: string) {
  return createHmac("sha256", adminSecret()).update(payload).digest("hex");
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function createAdminSession() {
  const exp = Date.now() + SESSION_MS;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function adminSessionValid(value: string | undefined) {
  if (!value) return false;
  const lastDot = value.lastIndexOf(".");
  if (lastDot < 1) return false;
  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const sep = payload.lastIndexOf(".");
  if (sep < 1) return false;
  const role = payload.slice(0, sep);
  const exp = Number(payload.slice(sep + 1));
  if (role !== "admin") return false;
  return Number.isFinite(exp) && Date.now() <= exp;
}

export function passwordMatchesAdmin(input: unknown) {
  if (typeof input !== "string" || input.length === 0) return false;
  const expected = adminPassword();
  if (!expected) return false;
  return safeEqual(input.normalize("NFC"), expected.normalize("NFC"));
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}
