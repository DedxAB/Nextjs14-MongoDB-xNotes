import { getServerSession } from "next-auth";
import NoteCard from "../NoteCard/NoteCard";
import { fetchAllNotes } from "@/services/noteServices";

const NotesFeed = async () => {
  // Fetch the all notes
  const notesData = await fetchAllNotes();
  const notes = notesData?.notes ? notesData?.notes : [];
  const session = await getServerSession(); 

  const currentUserEmail = session?.user?.email;
  const filteredNotes = notes?.filter((note) => {
    return (
      currentUserEmail === note?.author?.email || note?.visibility === "public"
    );
  });

  if (notes.length === 0) return <h1 className="text-2xl font-bold">No notes found!</h1>;

  return (
    <>
      {/* Show the note card */}
      {filteredNotes?.map((note) => {
        return <NoteCard key={note?._id} note={note} user={note?.author} />;
      })}
    </>
  );
};

export default NotesFeed;
