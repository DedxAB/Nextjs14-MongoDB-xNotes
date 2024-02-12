import EditTopic from "@/components/edit-topic/EditTopic";

export const metadata = {
  title: "Edit Topic | DedxCRUD",
};

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get topic");
    }
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const EditTopicPage = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicById(id);
  console.log(topic);
  const { title, description } = topic;
  return (
    <>
      <EditTopic id={id} title={title} description={description} />
    </>
  );
};

export default EditTopicPage;
