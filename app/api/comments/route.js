import connectDB from "@/helper/mongodb";
import Comment from "@/models/comment.model";
import Topic from "@/models/topic.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { text, author, noteId } = await req.json();
  try {
    await connectDB();
    const comment = await Comment.create({ text, author });
    if (!comment) {
      return NextResponse.json(
        { message: "Failed to add comment" },
        { status: 400 }
      );
    }
    await Topic.findByIdAndUpdate(
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
      { message: "Failed to connect to the database" },
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
      return NextResponse.json(
        { message: "No comments found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to DB" },
      { status: 500 }
    );
  }
};
