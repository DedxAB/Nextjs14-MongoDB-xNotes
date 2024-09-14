import { getServerSession } from "next-auth";

import { fetchAllSavedNotesByUserId } from "@/services/note/server/note.service";
import { fetchUserByEmail } from "@/services/user/server/user.service";
import NoteCard from "@/components/NoteCard/NoteCard";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";

export default async function page() {
  const session = await getServerSession();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  const data = await fetchAllSavedNotesByUserId(currentUser?.user?._id);
  const { data: savedNotes = [] } = data ?? {};
  return (
    <>
      <section id="savednote-banner">
        <WelcomeBanner
          title="Welcome Back!"
          description={
            savedNotes.length > 0
              ? `You've saved ${savedNotes.length} ${
                  savedNotes.length === 1 ? "note" : "notes"
                }. Explore ${savedNotes.length === 1 ? "it" : "them"} below.`
              : "You haven't saved any notes yet."
          }
        />
      </section>

      {savedNotes.length < 1 && (
        <h1 className="font-bold text-base">Start by adding your first one!</h1>
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
