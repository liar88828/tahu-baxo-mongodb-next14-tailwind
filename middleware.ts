import NextAuth from "next-auth";
import { authConfig } from "@/lib/utils/auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/lib/utils/routes";
import { NextAuthRequest } from "next-auth/lib";

const {auth} = NextAuth(authConfig);
export default auth((req : NextAuthRequest) => {
  const {nextUrl} = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher : ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
