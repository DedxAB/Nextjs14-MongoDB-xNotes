import EditNote from "@/components/EditNote/EditNote";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Edit Note | DedxNotes",
  description: "Created by DedxAB | A Note sharing WebApp.",
};

const fetchNoteById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/notes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get Note");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const page = async ({ params }) => {
  const { id } = params;
  const { note } = await fetchNoteById(id);
  // console.log(note);
  const { title, description, author, tags, websiteLink } = note;

  return (
    <div className="min-h-[85vh]">
      <EditNote
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

export default page;
