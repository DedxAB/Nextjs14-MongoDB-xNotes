import Note from "@/models/note.model";
import connectDB from "@/db/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Comment from "@/models/comment.model";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  const { id } = params;
  const {
    newTitle,
    newDescription,
    newTags,
    newWebsiteLink,
    selectNewVisibility,
  } = await req.json();

  try {
    await connectDB();
    const session = await getServerSession();

    // Ensure the note exists and the session user is the author
    const note = await Note.findById(id).populate("author");
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    if (session?.user?.email !== note.author.email) {
      return NextResponse.json(
        { error: "You are not authorized to update this note" },
        { status: 403 }
      );
    }

    // Update the note with the new information
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        description: newDescription,
        tags: newTags,
        websiteLink: newWebsiteLink,
        contentUpdatedAt: Date.now(),
        visibility: selectNewVisibility,
      },
      { new: true }
    );

    // Check if the update was successful
    if (!updatedNote) {
      return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = async (_req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const note = await Note.findById(id)
      .populate("author")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: { path: "author" },
      });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ data: note }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
