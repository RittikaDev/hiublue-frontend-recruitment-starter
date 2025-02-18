import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoutes = ["/login"];

export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const userInfo = await getCurrentUser();
	// console.log(userInfo);

	// IF USER IS NOT AUTHENTICATED
	if (!userInfo) {
		// ALLOW ACCESS TO AUTHENTICATION ROUTES LIKE /LOGIN
		if (authRoutes.includes(pathname)) {
			return NextResponse.next();
		} else {
			// REDIRECT TO LOGIN PAGE WITH A REDIRECT PATH AFTER LOGIN
			return NextResponse.redirect(
				new URL(`/login?redirectPath=${pathname}`, request.url)
			);
		}
	}

	// IF USER IS AUTHENTICATED, ALLOW ACCESS TO THE REQUESTED PAGE
	return NextResponse.next();
};

export const config = {
	matcher: [
		"/login", // PUBLIC
		"/dashboard", // PROTECTED
		"/onboarding", // PROTECTED
	],
};
