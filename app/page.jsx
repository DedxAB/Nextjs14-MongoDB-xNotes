import NotesFeed from "@/components/NotesFeed/NotesFeed";
import SearchInput from "@/components/SearchInput/SearchInput";
import UserBanner from "@/components/UserBanner/UserBanner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BASE_URL } from "@/utils/constants";

const Home = () => {
  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`${BASE_URL}`}>Home</BreadcrumbLink>
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
