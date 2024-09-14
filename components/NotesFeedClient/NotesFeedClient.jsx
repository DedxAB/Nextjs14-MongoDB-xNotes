"use client";

import { useState } from "react";
import NoteCard from "../NoteCard/NoteCard";

export const NotesFeedClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <>
      {notes?.map((note) => {
        return (
          <NoteCard key={note?._id} note={note} noteAuthor={note?.author} />
        );
      })}
    </>
  );
};
