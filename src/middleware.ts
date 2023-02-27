import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    const url = req.nextUrl;
    const basicAuth = req.headers.get("authorization");
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      if (
        user === process.env.BASIC_USERNAME &&
        pwd === process.env.BASIC_PASSWORD
      ) {
        return NextResponse.next();
      }
    }
    url.pathname = "/api/auth";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
