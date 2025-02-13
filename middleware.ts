import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isLoggedIn = !!req.nextauth.token;
        const isOnDashboard = req.nextUrl.pathname.startsWith("/restaurant");

        if (isOnDashboard && !isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/restuarant/:path*"],
};
