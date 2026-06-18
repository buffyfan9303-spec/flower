import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "df_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 로그인 페이지/로그인 API는 보호 제외
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginPage || isLoginApi) return NextResponse.next();

  const token = req.cookies.get(COOKIE)?.value;
  const valid = token && token === process.env.ADMIN_TOKEN;
  if (valid) return NextResponse.next();

  // 미인증: 페이지는 로그인으로 리다이렉트, API는 401
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
