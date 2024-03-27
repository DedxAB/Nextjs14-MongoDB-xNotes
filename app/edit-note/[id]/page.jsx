import EditTopicComp from "@/components/Edit-Topic/EditTopicComp";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Edit Note | DedxNotes",
};

const getTopicById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get topic");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const EditTopicPage = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;

  return (
    <>
      <EditTopicComp id={id} title={title} description={description} />
    </>
  );
};

export default EditTopicPage;
