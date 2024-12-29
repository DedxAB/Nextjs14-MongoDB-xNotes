import { BASE_URL } from "@/utils/constants";

/***
 * Fetch all notifications for a user
 * @param userId
 * @returns {Promise<*>}
 * @throws {Error}
 * @example fetchNotificationsByUserId(userId)
 */

export const fetchNotificationsByUserIdForClient = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/notifications/user/${userId}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get all notifications");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
