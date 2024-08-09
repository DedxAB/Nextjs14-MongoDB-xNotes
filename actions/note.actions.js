"use server";

const { default: connectDB } = require("@/db/mongodb");
const { default: SavedNote } = require("@/models/savedNote.model");

export const handleCheckSavedNote = async (userId, noteId) => {
  "use server";
  try {
    await connectDB();
    const savedNote = await SavedNote.findOne({ userId, noteId });
    return { isSaved: !!savedNote };
  } catch (error) {
    console.log("Error checking saved note:", error);
  }
};
