import { cookies } from "next/headers";

export function getAuthCookies() {
  // This utility only runs on the server side
  const cookieStore = cookies();

  const callbackUrl = cookieStore.get("next-auth.callback-url")?.value;
  const csrfToken = cookieStore.get("next-auth.csrf-token")?.value;
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!callbackUrl || !csrfToken || !sessionToken) {
    console.error("Missing one or more auth cookies");
    return "";
  }

  // Return serialized cookies for headers
  return `next-auth.callback-url=${callbackUrl}; next-auth.csrf-token=${csrfToken}; next-auth.session-token=${sessionToken}`;
}
