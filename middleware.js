import { NextResponse } from "next/server";
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

// Middleware function to be executed for each request
export function middleware(request) {
  // Extract X-InstanceId header from the request
  const hostId = request.headers.get("x-instanceid");

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
  return NextResponse.next();
}
