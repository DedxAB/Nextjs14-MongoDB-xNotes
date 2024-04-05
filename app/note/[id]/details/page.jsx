import NoteDetailsById from "@/components/NoteDetailsById/NoteDetailsById";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Note Details | DedxNotes",
  description: "Created by DedxAB | A Note sharing WebApp.",
};

const fetchNoteById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get Note" || res.json());
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
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
