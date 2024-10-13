import { BASE_URL } from "@/utils/constants";

/**
 * Fetches all notes for the client with pagination.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=10] - The number of notes to fetch per page.
 * @returns {Promise<Object>} The JSON response containing the notes.
 * @throws {Error} If there is an error fetching the notes.
 */
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
