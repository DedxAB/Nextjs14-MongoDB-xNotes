import Note from "@/models/note.model";
import connectDB from "@/helper/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Comment from "@/models/comment.model";

export async function PATCH(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDescription: description,
    newTags: tags,
    newWebsiteLink: websiteLink,
  } = await req.json();

  try {
    await connectDB();
    // Update the contentUpdatedAt field along with title and description for only the updated note
    const note = await Note.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tags,
        websiteLink,
        contentUpdatedAt: Date.now(),
      },
      { new: true }
    );
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return Response.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update note" },
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
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { message: "Failed to connect with DB" },
      { status: 500 }
    );
  }
};
