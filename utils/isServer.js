/**
 * Checks if the code is running on the server side.
 *
 * @returns {boolean} True if the code is running on the server side, otherwise false.
 */
export const isServer = () => typeof window === "undefined";
