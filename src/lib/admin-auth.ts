import "server-only";

import {
  ADMIN_COOKIE,
  adminCookieOptions,
  adminSessionValid,
} from "@/lib/admin-session";
import { cookies } from "next/headers";

export async function adminAuthed() {
  const jar = await cookies();
  return adminSessionValid(jar.get(ADMIN_COOKIE)?.value);
}

export { ADMIN_COOKIE, adminCookieOptions };
