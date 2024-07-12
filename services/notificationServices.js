const { BASE_URL } = require("@/utils/constants");

export const fetchNotificationsByUserId = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/${userId}/notifications`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get all Users");
    }
    return await res.json();
  } catch (error) {
    console.log(
      "Failed to fetch notification, fetchNotificationsByUserId",
      error.message
    );
  }
};
