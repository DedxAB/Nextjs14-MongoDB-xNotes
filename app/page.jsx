import NotesFeed from "@/components/NotesFeed/NotesFeed";
import SearchInput from "@/components/SearchInput/SearchInput";
import UserBanner from "@/components/UserBanner/UserBanner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* UserBanner Welcome */}
      <UserBanner />
      {/* Search Input */}
      <SearchInput />
      {/* Notes Feed */}
      <NotesFeed />
    </div>
  );
};

export default Home;
