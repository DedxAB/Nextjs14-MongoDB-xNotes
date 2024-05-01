import NoteDetailsById from "@/components/NoteDetailsById/NoteDetailsById";
import { fetchNoteById } from "@/services/noteServices";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { note } = await fetchNoteById(id);
  return {
    title: `${note?.title || "Note Details"}`,
  };
};

const NoteDetails = async ({ params }) => {
  const { id } = params;

  const { note } = await fetchNoteById(id);
  // console.log(note);

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
