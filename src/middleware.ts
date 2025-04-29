import NextAuth, { type Session } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import { getToken } from "@auth/core/jwt";
import authConfig from "./lib/auth.config";
import { paths } from "./constants";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextRequest & { auth: Session | null }): Promise<Response | void> => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const token = await getToken({ req, secret: process.env.AUTH_SECRET });
	const userRole = token?.role || "USER"; // 👈 Default to 'USER' if no token

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isAdminRoute = nextUrl.pathname.startsWith("/administrator");

	if (isApiAuthRoute) {
		return;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (isAdminRoute && userRole !== "ADMIN") {
		return NextResponse.redirect(new URL("/unauthorized", nextUrl));
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}
		const encodedCallbackUrl = encodeURIComponent(callbackUrl);
		return Response.redirect(new URL(`${paths.login()}?callbackUrl=${encodedCallbackUrl}`, nextUrl));
	}
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // matcher used from Clerk
};
