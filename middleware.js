export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/create-note",
    "/edit-note/:path*",
    "/admin/:path*", // Match /admin/username/details
    "/profile/:path*", // Match /profile/username/details
    // "/api/:path*", // Match /api/endpoint
  ],
};
