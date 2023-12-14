import { NextResponse } from "next/server";
// Import the isAuthenticated function from the "@/lib/auth" module
import isAuthenticated from "@/lib/auth";

// Define the configuration for the middleware
export const config = {
  // Limit the middleware to paths starting with specific patterns
  matcher: [
    "/ccadmin/:function*",
    "/adminfile/:function*",
    "/ccadminx/:function*",
    "/ccagent/:function*",
    "/file/:function*",
  ],
};

// List of headers to be removed from the request
const blocklistHeaders = [
  // Common headers to be removed
  "accept",
  "cookie",
  "host",
  "postman-token",
  "cache-control",
  "connection",
  "accept-language",
  "x-forwarded-for",
  "x-forwarded-host",
  "origin",
  "x-forwarded-port",
  "x-forwarded-proto",
  "referrer",
  "x-invoke-path",
  "transfer-encoding",
  "x-invoke-query",
  "x-middleware-invoke",
];

// Middleware function to be executed for each request
export function middleware(request) {
  // Extract X-InstanceId header from the request
  const hostId = request.headers.get("x-instanceid");

  const newHeaders = new Headers(request.headers);

  // Remove specified headers from the request
  blocklistHeaders.forEach((key) => {
    newHeaders.delete(key);
  });

  // Check if X-InstanceId header is missing
  if (!hostId) {
    // Return a JSON response indicating an error
    return NextResponse.json(
      {
        errorCode: "01",
        message: `X-InstanceId header is missing in the request.`,
      },
      { status: 400 },
    );
  }

  // Call the isAuthenticated function to check the request's authentication
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an authentication error
    return NextResponse.json(
      { errorCode: "02", message: "authorization token is missing" },
      { status: 400 },
    );
  }

  // Continue processing if authentication is successful
  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
}
