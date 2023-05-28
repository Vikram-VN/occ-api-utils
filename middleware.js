import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const isLoggedIn = request.cookies.get('X-InstanceId')?.value;
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/deployment/:path*",
    "/export/:path*",
    "/extensions/:path*",
    "/files/:path*",
    "/import/:path*",
    "/organizations/:path*",
    "/profiles/:path*",
    "/search/:path*",
  ]

}