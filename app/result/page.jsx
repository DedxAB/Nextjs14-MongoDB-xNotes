import SearchFeed from "@/components/SearchFeed/SearchFeed";
import SearchResultBanner from "@/components/SearchResultBanner/SearchResultBanner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchResultOfQuery } from "@/services/resultServices";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Result</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SearchResultBanner
        searchingFor={q}
        notes={filteredNotes}
        users={users}
      />
      <SearchFeed notes={filteredNotes} users={users} />
    </div>
  );
};

export default Result;
