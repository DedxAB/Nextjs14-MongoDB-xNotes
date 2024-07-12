export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/create-note",
    "/edit-note/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/notifications",
  ],
};
