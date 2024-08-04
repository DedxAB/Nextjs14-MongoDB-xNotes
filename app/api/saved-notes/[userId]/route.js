import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import SavedNote from "@/models/savedNote.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { userId } = params;

  try {
    await connectDB();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const isExistUserId = await User.findById(userId);
    if (!isExistUserId) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const savedNotes = await SavedNote.find({ userId })
      .populate({
        path: "noteId",
        populate: {
          path: "author",
        },
      })
      .sort({ createdAt: -1 });

    if (savedNotes.length === 0) {
      return NextResponse.json(
        { message: "No saved notes found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Saved notes fetched successfully", data: savedNotes },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { message: "Error connecting to server" },
      { status: 500 }
    );
  }
};
