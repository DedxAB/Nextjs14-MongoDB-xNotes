import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { userId, isLiked } = await req.json();
  try {
    await connectDB();
    let update;
    if (isLiked) {
      update = { $addToSet: { likes: userId } };
    } else {
      update = { $pull: { likes: userId } };
    }
    const updatedNote = await Note.findByIdAndUpdate(id, update, {
      new: true,
    });

    // Check if the note exists
    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedNote }, { status: 200 });
  } catch (error) {
    // console.error(error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update Like" },
      { status: 500 }
    );
  }
};
