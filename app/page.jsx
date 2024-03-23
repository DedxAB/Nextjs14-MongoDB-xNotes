import TopicList from "@/components/topic-list/TopicListComp";
import UserBanner from "@/components/userBanner/UserBanner";

const Home = async () => {
  return (
    <div className="overflow-y-scroll h-[83vh]" id="customScrollBar">
      {/* UserBanner Welcome */}
      <UserBanner />
      {/* Show the topic list */}
      <TopicList />
    </div>
  );
};

export default Home;
