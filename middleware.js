export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/create-note",
    "/edit-note/:path*",
    "/admin/:path*", // Match /admin/username/details
    "/profile/:path*", // Match /profile/username/details
  ],
};
