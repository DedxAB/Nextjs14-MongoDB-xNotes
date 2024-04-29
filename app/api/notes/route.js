import connectDB from "@/db/mongodb";
import Comment from "@/models/comment.model";
import Note from "@/models/note.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, author, tags, websiteLink } = await req.json();
  try {
    await connectDB();

    // Check if a note with the same title already exists
    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      return NextResponse.json(
        { message: "Title already exists. Please try another Title" },
        { status: 400 }
      );
    }

    const newNote = await Note.create({
      title,
      description,
      author,
      tags,
      websiteLink,
    });

    // Find the user by id and add the new note to their notes array
    // here i use push method to push the new note id to the notes array
    // but in this case i can use $addToSet to avoid duplicate values in the array of notes
    await User.findByIdAndUpdate(
      author,
      { $addToSet: { notes: newNote._id } },
      { new: true }
    );

    if (!newNote) {
      return NextResponse.json(
        { message: "Failed to create note" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Note created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to connect with server",
      },
      { status: 500 }
    );
  }
}

export async function GET(_req) {
  try {
    await connectDB();
    const notes = await Note.find().populate("author").sort({ createdAt: -1 });
    if (!notes) {
      return NextResponse.json({ message: "No notes found" }, { status: 404 });
    }
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    await User.findByIdAndUpdate(
      deletedNote.author,
      {
        $pull: { notes: deletedNote._id },
      },
      { new: true }
    );
    // delete the related comments
    await Comment.deleteMany({ _id: { $in: deletedNote.comments } });
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to connect with DB",
      },
      { status: 500 }
    );
  }
}
