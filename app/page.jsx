import TopicList from "@/components/topic-list/TopicList";

const Home = () => {
  return (
    <div className="overflow-y-scroll h-[83vh]" id="customScrollBar">
      <TopicList />
    </div>
  );
};

export default Home;
