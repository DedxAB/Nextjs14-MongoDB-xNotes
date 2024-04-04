import SearchFeed from "@/components/SearchFeed/SearchFeed";
import SearchResultBanner from "@/components/SearchResultBanner/SearchResultBanner";
import { BASE_URL } from "@/utils/constants";

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
      throw new Error(
        "Something went wrong!" || dataNotes.json() || dataUsers.json()
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
    <div className="min-h-screen">
      <SearchResultBanner searchingFor={q} />
      <SearchFeed notes={notes} users={users} />
    </div>
  );
};

export default Result;
