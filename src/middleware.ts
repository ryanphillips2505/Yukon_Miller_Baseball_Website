import { ADMIN_COOKIE } from "@/lib/admin-constants";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin";
  const isAuthApi = pathname === "/api/admin/auth";
  if (isLogin || isAuthApi) return NextResponse.next();

  const needsAuth =
    pathname.startsWith("/admin/") || pathname.startsWith("/api/admin");
  if (!needsAuth) return NextResponse.next();

  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
