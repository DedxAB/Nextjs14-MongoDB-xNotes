"use client";
import { useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ProfileSearchInput from "../NoteSearchInput/NoteSearchInput";

const UserNotesFeed = ({ notes, user }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes || []);

  return (
    <>
      <ProfileSearchInput
        allNotes={notes}
        setFilteredNotes={setFilteredNotes}
      />
      {filteredNotes.length > 0 ? (
        <h1 className="font-bold text-base mb-3">
          All Notes ({filteredNotes?.length})
        </h1>
      ) : (
        <h1 className="font-bold text-lg mb-3">No notes found</h1>
      )}

      {filteredNotes.length > 0 &&
        filteredNotes.map((note) => (
          <NoteCard key={note?._id} note={note} user={user} />
        ))}
    </>
  );
};

export default UserNotesFeed;
