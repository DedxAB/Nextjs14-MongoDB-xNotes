const { default: connectDB } = require("@/helper/mongodb");
const { default: Topic } = require("@/models/topic.model");

export async function POST(req) {
  await connectDB();
  const { title, description, author } = await req.json();
  await Topic.create({ title, description, author });
  /*
  const newTopic = new Topic({
    title: title,
    description: description,
    author: author,
  });
  await newTopic.save();
  */
  return Response.json({ message: "topic created" }, { status: 201 });
}

export async function GET(_req) {
  await connectDB();
  const topics = await Topic.find().populate("author").sort({ createdAt: -1 });
  return Response.json({ topics });
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");
  await Topic.findByIdAndDelete(id);
  return Response.json({ message: "topic deleted" });
}
