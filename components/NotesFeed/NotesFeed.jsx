import { BASE_URL } from "@/utils/constants";
import TopicCard from "../TopicCard/TopicCard";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store", // Disable cache
    });
    if (!res.ok) throw new Error("Error fetching Notes");
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};
const NotesFeed = async () => {
  let topics = []; // Define topics outside of the try block

  try {
    const response = await getTopics();
    topics = response.topics; // Assign the value inside the try block
    // console.log(topics);
  } catch (error) {
    console.log(error.message);
  }

  return (
    <>
      <TopicCard topics={topics} />
    </>
  );
};

export default NotesFeed;
