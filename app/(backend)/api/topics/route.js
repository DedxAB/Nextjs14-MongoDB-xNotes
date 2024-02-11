const { default: connectDB } = require("@/libs/mongodb");
const { default: Topic } = require("@/models/topic");

export async function POST(req) {
  const { title, description } = await req.json();
  await connectDB();
  await Topic.create({ title, description });
  return Response.json({ message: "topic created" }, { status: 201 });
}

export async function GET(_req) {
  await connectDB();
  const topics = await Topic.find();
  return Response.json({topics});
}