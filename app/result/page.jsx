import SearchFeed from "@/components/SearchFeed/SearchFeed";
import SearchResultBanner from "@/components/SearchResultBanner/SearchResultBanner";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Result",
};

const fetchData = async (q) => {
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

const Result = async ({ searchParams }) => {
  const { q } = searchParams;

  const { notesArray, usersArray } = await fetchData(q);
  const notes = notesArray;
  //   console.log("notes", notes);
  const users = usersArray;
  //   console.log("users", users);
  return (
    <div className="min-h-[85vh]">
      <SearchResultBanner searchingFor={q} notes={notes} users={users} />
      <SearchFeed notes={notes} users={users} />
    </div>
  );
};

export default Result;
