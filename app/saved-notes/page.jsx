import NoteCard from "@/components/NoteCard/NoteCard";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchAllSavedNotesByUserId } from "@/services/noteServices";
import { fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  const data = await fetchAllSavedNotesByUserId(currentUser?.user?._id);
  const { data: savedNotes = [] } = data ?? {};
  return (
    <>
      <WelcomeBanner
        title={`Your Saved Notes`}
        description={`Here are all the notes you have saved (${savedNotes.length}).`}
      />

      {savedNotes.length < 1 && (
        <h1 className="font-bold text-base">
          You have not saved any notes yet
        </h1>
      )}

      {savedNotes.length > 0 &&
        savedNotes.map(
          (note) =>
            !!note?.noteId && (
              <NoteCard
                key={note._id}
                note={note.noteId}
                noteAuthor={note.noteId.author}
              />
            )
        )}
    </>
  );
}
