import EditNote from "@/components/EditNote/EditNote";
import { fetchNoteById } from "@/services/noteServices";

export const metadata = {
  title: "Edit Note",
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
