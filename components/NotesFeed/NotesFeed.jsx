import { BASE_URL } from "@/utils/constants";
import NoteCard from "../NoteCard/NoteCard";

const fetchNotes = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/notes`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error fetching Notes");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
const NotesFeed = async () => {
  // Fetch the notes
  const { notes } = await fetchNotes();

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
