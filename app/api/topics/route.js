const { default: connectDB } = require("@/libs/mongodb");
const { default: Topic } = require("@/models/topic.models");

export async function POST(req) {
  await connectDB();
  const { title, description } = await req.json();
  await Topic.create({ title, description });
  return Response.json({ message: "topic created" }, { status: 201 });
}

export async function GET(_req) {
  await connectDB();
  const topics = await Topic.find();
  return Response.json({ topics });
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");
  await Topic.findByIdAndDelete(id);
  return Response.json({ message: "topic deleted" });
}
