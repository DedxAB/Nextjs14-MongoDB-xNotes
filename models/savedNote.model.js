import mongoose from "mongoose";

const savedNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
  },
  { timestamps: true }
);

savedNoteSchema.index({ userId: 1, noteId: 1 }, { unique: true }); // Prevent duplicate saved notes, one user can save a note only once, but can save multiple notes, It is simply added to the schema to prevent duplicate saved notes.

const SavedNote =
  mongoose.models.SavedNote || mongoose.model("SavedNote", savedNoteSchema);
export default SavedNote;
