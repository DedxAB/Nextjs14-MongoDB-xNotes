"use client";
import { useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ProfileSearchInput from "../ProfileSearchInput/ProfileSearchInput";

const UserNotesFeed = ({ notes, user }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes || []);

  return (
    <>
      {notes?.length > 0 && (
        <ProfileSearchInput
          allNotes={notes}
          user={user}
          setFilteredNotes={setFilteredNotes}
        />
      )}

      {filteredNotes.length > 0 ? (
        <h1 className="font-bold text-base my-5">
          All Notes ({filteredNotes?.length})
        </h1>
      ) : (
          <h1 className="font-bold text-lg mb-3">
            User hasn&apos;t shared any notes yet
          </h1>
      )}
      {filteredNotes.length > 0 &&
        filteredNotes.map((note) => (
          <NoteCard key={note?._id} note={note} user={user} />
        ))}
    </>
  );
};

export default UserNotesFeed;
