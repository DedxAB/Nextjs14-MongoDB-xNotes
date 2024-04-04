import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { q } = params;
  try {
    await connectDB();
    // Use a regex for case-insensitive searching
    const regex = new RegExp(q, "i");

    const topics = await Topic.find({
      $or: [{ title: regex }, { tags: regex }, { description: regex }],
    })
      .populate("author")
      .sort({ createdAt: -1 });

    if (!topics) {
      return NextResponse.json({ message: "No notes found" }, { status: 404 });
    }

    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ message: error.message }, 500);
  }
};
