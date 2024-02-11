const { default: connectDB } = require("@/libs/mongodb");
const { default: Topic } = require("@/models/topic");

export async function POST(req) {
  const { title, description } = await req.json();
  await connectDB();
  await Topic.create({ title, description });
  return Response.json({ message: "topic created" }, { status: 201 });
}
