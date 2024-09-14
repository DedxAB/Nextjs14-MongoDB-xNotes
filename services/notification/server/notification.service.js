import { BASE_URL } from "@/utils/constants";
import { getRequestOptions } from "@/utils/getRequestOptions";

export const fetchNotificationsByUserId = async (userId) => {
  try {
    const options = getRequestOptions();
    if (!options) return null;

    const res = await fetch(
      `${BASE_URL}/api/notifications/user/${userId}/`,
      options
    );

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get all notifications");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
