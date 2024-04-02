import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { userId, isLiked } = await req.json();
  // console.log(userId, isLiked, id);
  try {
    await connectDB();
    let update;
    if (isLiked) {
      update = { $addToSet: { likes: userId } };
    } else {
      update = { $pull: { likes: userId } };
    }
    const topic = await Topic.findByIdAndUpdate(id, update, { new: true });

    // Check if the topic exists
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Like updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to update Like" },
      { status: 500 }
    );
  }
};
