import { getAuthCookies } from "./getAuthCookies";
import { isServer } from "./isServer";

// Helper function to prepare headers for server side and client side fetching
export const getRequestOptions = () => {
  const options = { cache: "no-store" };

  if (isServer()) {
    const cookieHeader = getAuthCookies();
    if (!cookieHeader) {
      console.error("Unable to fetch auth cookies");
      return options;
    }
    options.headers = { Cookie: cookieHeader };
  }

  return options;
};
