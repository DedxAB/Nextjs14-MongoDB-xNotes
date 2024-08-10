"use server";

import connectDB from "@/db/mongodb";
import SavedNote from "@/models/savedNote.model";

export const handleCheckSavedNote = async (userId, noteId) => {
  try {
    await connectDB();
    const savedNote = await SavedNote.findOne({ userId, noteId });
    return { isSaved: !!savedNote };
  } catch (error) {
    console.log("Error checking saved note:", error);
  }
};
