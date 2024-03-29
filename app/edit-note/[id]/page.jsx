import EditTopic from "@/components/EditTopic/EditTopic";
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
      throw new Error("Failed to get Note");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const EditTopicPage = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicById(id);
  // console.log(topic);
  const { title, description, author } = topic;

  return (
    <div className="min-h-screen">
      <EditTopic
        id={id}
        title={title}
        description={description}
        authorId={author}
      />
    </div>
  );
};

export default EditTopicPage;
