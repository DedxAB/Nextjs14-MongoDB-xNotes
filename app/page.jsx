import NotesFeed from "@/components/NotesFeed/NotesFeed";
import SearchInput from "@/components/SearchInput/SearchInput";
import UserBanner from "@/components/UserBanner/UserBanner";

const Home = () => {
  return (
    <div className="min-h-screen" id="customScrollBar">
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
