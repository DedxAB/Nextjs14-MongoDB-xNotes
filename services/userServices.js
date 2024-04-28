import { BASE_URL } from "@/utils/constants";

async function fetchAllUser() {
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get all Users");
    }
    return await res.json();
  } catch (error) {
    console.log("Failed to fetch all user", error.message);
  }
}

// fetch user by email
async function fetchUserByEmail(email) {
  try {
    const res = await fetch(`${BASE_URL}/api/user/email/${email}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get User");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}
// fetch user by id
async function fetchUserById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get User");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

export { fetchAllUser, fetchUserById, fetchUserByEmail };
