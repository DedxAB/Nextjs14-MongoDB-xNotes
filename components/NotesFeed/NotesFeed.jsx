import { getServerSession } from "next-auth";
import NoteCard from "../NoteCard/NoteCard";
import { fetchAllNotes } from "@/services/noteServices";

const NotesFeed = async () => {
  // Fetch the all notes
  const { notes } = await fetchAllNotes();
  const session = await getServerSession();

  const currentUserEmail = session?.user?.email;
  const filteredNotes = notes?.filter((note) => {
    return (
      currentUserEmail === note?.author?.email || note?.visibility === "public"
    );
  });

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
