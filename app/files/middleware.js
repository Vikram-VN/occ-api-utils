import { NextResponse } from "next/server";

export function middleware(req) {
  const nextUrl = req.nextUrl;
  if (nextUrl.pathname === '/files') {
    if (req.cookies.accessToken) {
      return NextResponse.rewrite(new URL('/login', req.url));
    } else {
      return NextResponse.rewrite(new URL('/files', req.url));
    }
  }
}