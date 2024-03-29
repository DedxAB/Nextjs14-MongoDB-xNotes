import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await req.json();
  await connectDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return Response.json({ message: "Note updated" }, { status: 200 });
}

export async function GET(_req, { params }) {
  const { id } = params;
  await connectDB();
  //   const topic = await Topic.findOne({ _id: id });
  const topic = await Topic.findById(id).populate("author");
  return Response.json({ topic }, { status: 200 });
}
