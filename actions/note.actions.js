"use server";

import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import SavedNote from "@/models/savedNote.model";

/*
 *
 * The reduce function is used to transform the savedNotes array into an object     (savedNotesMap).
 * The noteId is used as the key, and the value is set to true to indicate that the note is saved.
 */

export const handleCheckAllSavedNotes = async (userId) => {
  try {
    await connectDB();
    const savedNotes = await SavedNote.find({ userId });
    const savedNotesMap = savedNotes.reduce((map, note) => {
      map[note.noteId] = true;
      return map;
    }, {});
    return savedNotesMap;
  } catch (error) {
    console.log("Error fetching saved notes:", error);
    return {};
  }
};
