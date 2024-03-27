import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";
import User from "@/models/user.model";

export async function POST(req) {
  const { title, description, author } = await req.json();
  try {
    await connectDB();
    const newTopic = await Topic.create({ title, description, author });

    // Find the user by id and add the new topic to their notes array
    await User.findByIdAndUpdate(
      author,
      { $push: { notes: newTopic._id } },
      { new: true }
    );

    return Response.json({ message: "Note created" }, { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Note", { status: 500 });
  }
}

export async function GET(_req) {
  await connectDB();
  const topics = await Topic.find()
    .populate("author")
    .sort({ createdAt: -1 });
  return Response.json({ topics });
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");
  await Topic.findByIdAndDelete(id);
  return Response.json({ message: "Note deleted" });
}
