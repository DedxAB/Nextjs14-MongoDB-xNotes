import connectDB from "@/db/mongodb";
import Comment from "@/models/comment.model";
import Note from "@/models/note.model";
import Notification from "@/models/notification.model";
import SavedNote from "@/models/savedNote.model";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, author, tags, websiteLink, visibility } =
    await req.json();
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
      visibility,
    });

    if (!newNote) {
      return NextResponse.json(
        { message: "Failed to create note" },
        { status: 500 }
      );
    }

    // Find the user by id and add the new note to their notes array
    // here i use push method to push the new note id to the notes array
    // but in this case i can use $addToSet to avoid duplicate values in the array of notes
    await User.findByIdAndUpdate(
      author,
      { $addToSet: { notes: newNote._id } },
      { new: true }
    );

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
    return NextResponse.json({ data: notes }, { status: 200 });
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

    const session = await getServerSession();
    const currentUser = await User.findOne({ email: session?.user?.email });
    const note = await Note.findById(id).populate("author");

    // Check if the current user is the author of the note or an admin
    if (session.user.email !== note?.author?.email && !currentUser.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to delete this note" },
        { status: 403 }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json(
        {
          message: "Note not found",
        },
        { status: 404 }
      );
    }

    // remove the note id from the user's notes array
    await User.findByIdAndUpdate(
      deletedNote.author,
      {
        $pull: { notes: deletedNote._id },
      },
      { new: true }
    );

    // remove the comments from Comment collection that are associated with the deleted note
    await Comment.deleteMany({ _id: { $in: deletedNote.comments } });

    // remove the notes from SavedNote collection that are associated with the deleted note
    await SavedNote.deleteMany({ noteId: deletedNote._id });

    // remove the notifications from Notification collection that are associated with the deleted note
    await Notification.deleteMany({ noteId: deletedNote._id });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to connect with server. Please try again later",
      },
      { status: 500 }
    );
  }
}
