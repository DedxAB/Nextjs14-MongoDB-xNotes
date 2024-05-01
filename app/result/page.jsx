import SearchFeed from "@/components/SearchFeed/SearchFeed";
import SearchResultBanner from "@/components/SearchResultBanner/SearchResultBanner";
import { fetchResultOfQuery } from "@/services/resultServices";

export const generateMetadata = async ({ searchParams }) => {
  const { q } = searchParams;
  return {
    title: `Search results for ${q}`,
  };
};

const Result = async ({ searchParams }) => {
  const { q } = searchParams;

  const { notesArray, usersArray } = await fetchResultOfQuery(
    encodeURIComponent(q)
  );
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
