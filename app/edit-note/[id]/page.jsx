import EditNote from "@/components/EditNote/EditNote";
import { BASE_URL } from "@/utils/constants";
import { toast } from "sonner";

export const metadata = {
  title: "Edit Note",
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
    toast.error(error.message);
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
