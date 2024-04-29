import connectDB from "@/db/mongodb";
import Comment from "@/models/comment.model";
import Note from "@/models/note.model";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id: commentId } = params;
  const { noteId } = await req.json();
  try {
    await connectDB();
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return NextResponse.json(
        { message: "Comment not found." },
        { status: 404 }
      );
    }
    await Note.findByIdAndUpdate(
      noteId,
      {
        $pull: { comments: deletedComment._id },
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Comment deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server." },
      { status: 500 }
    );
  }
};
