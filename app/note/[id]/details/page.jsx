import NoteDetailsById from "@/components/NoteDetailsById/NoteDetailsById";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchNoteById } from "@/services/noteServices";
import { getServerSession } from "next-auth";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { note } = await fetchNoteById(id);
  return {
    title: `${note?.title || "Note Details"}`,
  };
};

const NoteDetails = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  const { note } = await fetchNoteById(id);
  // console.log(note);

  if (
    currentUserEmail !== note?.author?.email &&
    note?.visibility !== "public"
  ) {
    return (
      <div className="min-h-[85vh]">
        <WelcomeBanner
          title={`Note Details`}
          description={`This note is private and can only be viewed by the author. If you want
          to view this note, please ask the author to change the visibility to
          public.`}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh]">
      <NoteDetailsById note={note} />
    </div>
  );
};

export default NoteDetails;

/* 
{
  _id: '6606a276202bdb6dea67ea3c',
  title: 'Heroicons',
  description: 'Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.',
  author: '65fd5ea0650dea0c24bd28c8',
  createdAt: '2024-03-29T11:13:58.993Z',
  updatedAt: '2024-03-29T11:13:58.993Z',
  __v: 0
}
*/
