import { BASE_URL } from "@/utils/constants";
import { getRequestOptions } from "@/utils/getRequestOptions";

// fetch note by id
async function fetchNoteById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/notes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to get Note");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

// fetch all notes
async function fetchAllNotes(page = 1, limit = 10) {
  try {
    const options = getRequestOptions();
    if (!options) return null;

    const res = await fetch(
      `${BASE_URL}/api/notes?page=${page}&limit=${limit}`,
      options
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

async function fetchAllSavedNotesByUserId(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/saved-notes/${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching saved notes");
    }
    return await response.json();
  } catch (error) {
    console.log(`Error fetching saved notes: ${error.message}`);
  }
}

export { fetchNoteById, fetchAllNotes, fetchAllSavedNotesByUserId };
