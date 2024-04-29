import NoteCard from "../NoteCard/NoteCard";
import { fetchAllNotes } from "@/services/noteServices";

const NotesFeed = async () => {
  // Fetch the all notes
  const { notes } = await fetchAllNotes();

  return (
    <>
      {/* Show the note card */}
      {notes?.map((note) => {
        return <NoteCard key={note?._id} note={note} user={note?.author} />;
      })}
    </>
  );
};

export default NotesFeed;
