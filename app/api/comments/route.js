import connectDB from "@/db/mongodb";
import Comment from "@/models/comment.model";
import Note from "@/models/note.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { text, author, noteId } = await req.json();
  try {
    await connectDB();
    const comment = await Comment.create({ text, author });
    if (!comment) {
      return NextResponse.json(
        { error: "Failed to add comment" },
        { status: 400 }
      );
    }
    await Note.findByIdAndUpdate(
      noteId,
      {
        $addToSet: { comments: comment._id },
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (_req) => {
  try {
    await connectDB();
    const comments = await Comment.find()
      .populate("author")
      .sort({ createdAt: -1 });

    if (!comments) {
      return NextResponse.json({ error: "No comments found" }, { status: 404 });
    }
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
