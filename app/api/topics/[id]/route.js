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
  await connectDB();
  // Update the contentUpdatedAt field along with title and description for only the updated note
  await Topic.findByIdAndUpdate(id, {
    title,
    description,
    tags,
    websiteLink,
    contentUpdatedAt: Date.now(),
  });
  return Response.json({ message: "Note updated" }, { status: 200 });
}

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    //   const topic = await Topic.findOne({ _id: id });
    const note = await Topic.findById(id).populate("author");
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
