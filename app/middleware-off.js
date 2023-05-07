import { NextResponse, NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = async (req = NextRequest) => {
    const allCookies = req.cookies.getAll();
    console.log(allCookies);
    return NextResponse.redirect(new URL('/login', req.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/files/:path*', '/import/:path*', '/export/:path*']
};