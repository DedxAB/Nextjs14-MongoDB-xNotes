import { cookies } from "next/headers";

/**
 *
 * @returns {String} - Serialized auth cookies
 */

export function getAuthCookies() {
  // This utility only runs on the server side
  const cookieStore = cookies();

  // Determine cookie prefixes based on environment
  const COOKIE_PREFIXES = {
    development: {
      callbackUrl: "next-auth.callback-url",
      csrfToken: "next-auth.csrf-token",
      sessionToken: "next-auth.session-token",
    },
    production: {
      callbackUrl: "__Secure-next-auth.callback-url",
      csrfToken: "__Host-next-auth.csrf-token",
      sessionToken: "__Secure-next-auth.session-token",
    },
  };

  // Determine environment
  const isProduction = process.env.NODE_ENV === "production";
  const cookieNames = isProduction
    ? COOKIE_PREFIXES.production
    : COOKIE_PREFIXES.development;

  // Retrieve cookies
  const callbackUrl = cookieStore.get(cookieNames.callbackUrl)?.value;
  const csrfToken = cookieStore.get(cookieNames.csrfToken)?.value;
  const sessionToken = cookieStore.get(cookieNames.sessionToken)?.value;

  if (!callbackUrl || !csrfToken || !sessionToken) {
    console.error("Missing one or more auth cookies");
    return "";
  }

  // Return serialized cookies for headers
  return `${cookieNames.callbackUrl}=${callbackUrl}; ${cookieNames.csrfToken}=${csrfToken}; ${cookieNames.sessionToken}=${sessionToken}`;
}
