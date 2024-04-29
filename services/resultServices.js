import { BASE_URL } from "@/utils/constants";

// fetch the results of notes and users by search query

const fetchResultOfQuery = async (q) => {
  try {
    const notesResponse = fetch(`${BASE_URL}/api/results/notes/${q}`, {
      cache: "no-store",
    });
    const usersResponse = fetch(`${BASE_URL}/api/results/users/${q}`, {
      cache: "no-store",
    });

    const [dataNotes, dataUsers] = await Promise.all([
      notesResponse,
      usersResponse,
    ]);

    if (!dataNotes.ok || !dataUsers.ok) {
      const errorNotesData = await dataNotes.json();
      const errorUsersData = await dataUsers.json();
      throw new Error(
        errorNotesData.message ||
          errorUsersData.message ||
          "Something went wrong!"
      );
    }

    const notesArray = await dataNotes.json();
    const usersArray = await dataUsers.json();

    return { notesArray, usersArray };
  } catch (error) {
    console.error(error);
  }
};

export { fetchResultOfQuery };
