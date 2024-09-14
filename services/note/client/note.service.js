import { BASE_URL } from "@/utils/constants";

export async function fetchAllNotesForClient(page = 1, limit = 10) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/notes?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Error fetching Notes");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}
