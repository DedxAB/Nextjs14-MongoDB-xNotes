import EditNote from "@/components/EditNote/EditNote";
import { fetchNoteById } from "@/services/noteServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Note",
};

const page = async ({ params }) => {
  const { id } = params;
  const { note } = await fetchNoteById(id);
  const session = await getServerSession();
  // console.log(note);
  const { title, description, author, tags, websiteLink, visibility } = note;

  // Check if the current user is the author of the note, if not redirect to the home page
  if (session?.user?.email !== author?.email) {
    redirect("/");
  }

  // if the current user is the author of the note, render the edit note page
  return (
    <div className="min-h-[85vh]">
      <EditNote
        id={id}
        title={title}
        websiteLink={websiteLink}
        description={description}
        author={author}
        tags={tags}
        visibility={visibility}
      />
    </div>
  );
};

export default page;
