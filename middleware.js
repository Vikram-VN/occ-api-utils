import isAuthenticated from "@/lib/auth";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    "/ccadmin/:function*",
    "/adminfile/:function*",
    "/ccadminx/:function*",
    "/ccagent/:function*",
    "/file/:function*",
  ],
};

export function middleware(request) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: "authorization token is missing" },
      { status: 401 }
    );
  }
}
