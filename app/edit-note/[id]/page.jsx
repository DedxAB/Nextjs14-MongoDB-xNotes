import EditTopic from "@/components/EditTopic/EditTopic";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Edit Note | DedxNotes",
  description: "Created by DedxAB | A Note sharing WebApp.",
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
  const { note } = await getTopicById(id);
  // console.log(topic);
  const { title, description, author, tags, websiteLink } = note;

  return (
    <div className="min-h-[85vh]">
      <EditTopic
        id={id}
        title={title}
        websiteLink={websiteLink}
        description={description}
        author={author}
        tags={tags}
      />
    </div>
  );
};

export default EditTopicPage;
