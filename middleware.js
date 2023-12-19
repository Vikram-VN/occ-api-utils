import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
  const hostId = cookies().get("x-instanceid")?.value;
  const accessToken = cookies().get("x-authorization")?.value;

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
  if (!accessToken) {
    // Respond with JSON indicating an authentication error
    return NextResponse.json(
      { errorCode: "02", message: "authorization token is missing" },
      { status: 400 },
    );
  }

  const newHeaders = new Headers(request.headers);
  newHeaders.set("Authorization", `Bearer ${accessToken}`);
  newHeaders.set("X-InstanceId", hostId);

  // Continue processing if authentication is successful
  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
}
