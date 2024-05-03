import SearchFeed from "@/components/SearchFeed/SearchFeed";
import SearchResultBanner from "@/components/SearchResultBanner/SearchResultBanner";
import { fetchResultOfQuery } from "@/services/resultServices";
import { getServerSession } from "next-auth";

export const generateMetadata = async ({ searchParams }) => {
  const { q } = searchParams;
  return {
    title: `Search results for ${q}`,
  };
};

const Result = async ({ searchParams }) => {
  const { q } = searchParams;
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  const { notesArray, usersArray } = await fetchResultOfQuery(
    encodeURIComponent(q)
  );
  const notes = notesArray;
  //   console.log("notes", notes);
  const filteredNotes = notes?.filter((note) => {
    return (
      currentUserEmail === note?.author?.email || note?.visibility === "public"
    );
  });
  const users = usersArray;
  //   console.log("users", users);
  return (
    <div className="min-h-[85vh]">
      <SearchResultBanner searchingFor={q} notes={filteredNotes} users={users} />
      <SearchFeed notes={filteredNotes} users={users} />
    </div>
  );
};

export default Result;
