import { getServerSession } from "next-auth";
import NoteCard from "../NoteCard/NoteCard";
import { fetchAllNotes } from "@/services/noteServices";

const NotesFeed = async () => {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  // Fetch the all notes
  const { data: notes = [] } = (await fetchAllNotes()) ?? { data: [] };

  const filteredNotes = notes?.filter((note) => {
    return (
      currentUserEmail === note?.author?.email || note?.visibility === "public"
    );
  });

  if (notes.length === 0)
    return <h1 className="text-2xl font-bold">No notes found!</h1>;

  return (
    <>
      {/* Show the note card */}
      {filteredNotes?.map((note) => {
        return (
          <NoteCard key={note?._id} note={note} noteAuthor={note?.author} />
        );
      })}
    </>
  );
};

export default NotesFeed;
