import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, author, tags, websiteLink } = await req.json();
  try {
    await connectDB();

    // Check if a topic with the same title already exists
    const existingTopic = await Topic.findOne({ title });
    if (existingTopic) {
      return Response.json(
        { message: "Title already exists. Please try another Title" },
        { status: 400 }
      );
    }

    const newTopic = await Topic.create({
      title,
      description,
      author,
      tags,
      websiteLink,
    });

    // Find the user by id and add the new topic to their notes array
    // here i use push method to push the new topic id to the notes array
    // but in this case i can use $addToSet to avoid duplicate values in the array of notes
    await User.findByIdAndUpdate(
      author,
      { $addToSet: { notes: newTopic._id } },
      { new: true }
    );

    return Response.json({ message: "Note created" }, { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Note", { status: 500 });
  }
}

export async function GET(_req) {
  try {
    await connectDB();
    const notes = await Topic.find()
      .populate("author")
      .sort({ createdAt: -1 });
    if (!notes) {
      return NextResponse.json({ message: "No notes found" }, { status: 404 });
    }
    return Response.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");
  await Topic.findByIdAndDelete(id);
  return Response.json({ message: "Note deleted" });
}
