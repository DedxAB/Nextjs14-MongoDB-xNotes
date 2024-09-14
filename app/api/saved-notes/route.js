import { NextResponse } from "next/server";

import connectDB from "@/db/mongodb";
import SavedNote from "@/models/savedNote.model";

export const POST = async (req, _res) => {
  const { userId, noteId } = await req.json();
  try {
    await connectDB();
    if (!userId || !noteId) {
      return NextResponse.json(
        { error: "User ID and Note ID are required" },
        { status: 400 }
      );
    }
    const isExistSavedNote = await SavedNote.findOne({ userId, noteId });
    if (isExistSavedNote) {
      return NextResponse.json(
        { error: "Note already saved" },
        { status: 409 }
      );
    }
    const savedNote = await SavedNote.create({ userId, noteId });
    return NextResponse.json(
      { message: "Note saved successfully", data: savedNote },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, _res) => {
  const { userId, noteId } = await req.json();
  try {
    await connectDB();
    if (!userId || !noteId) {
      return NextResponse.json(
        { error: "User ID and Note ID are required" },
        { status: 400 }
      );
    }
    const removedSavedNote = await SavedNote.deleteOne({ userId, noteId });
    if (removedSavedNote.deletedCount === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Note removed successfully", data: removedSavedNote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
