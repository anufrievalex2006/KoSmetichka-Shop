import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];

export default function proxy(req: NextRequest) {
    const {pathname} = req.nextUrl;
    const atoken = req.cookies.get("accessToken")?.value;
    const rtoken = req.cookies.get("refreshToken")?.value;
    const isAuth = Boolean(atoken || rtoken);

    if (authRoutes.includes(pathname) && isAuth)
        return NextResponse.redirect(new URL("/profile", req.url));
    if (protectedRoutes.some(x => pathname.startsWith(x)) && !isAuth)
        return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/profile/:path*"]
};