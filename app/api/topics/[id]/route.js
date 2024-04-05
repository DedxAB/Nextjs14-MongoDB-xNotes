import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";
import { NextResponse } from "next/server";

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
    const note = await Topic.findByIdAndUpdate(
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

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const note = await Topic.findById(id)
      .populate("author")
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author" },
      });

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return Response.json({ note }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch note" },
      { status: 500 }
    );
  }
}
