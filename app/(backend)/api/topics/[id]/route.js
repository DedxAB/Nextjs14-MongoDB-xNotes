import connectDB from "@/libs/mongodb";
import Topic from "@/models/topic";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await req.json();
  await connectDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return Response.json({ message: "topic updated" }, { status: 200 });
}

export async function GET(_req, { params }) {
  const { id } = params;
  await connectDB();
  //   const topic = await Topic.findOne({ _id: id });
  const topic = await Topic.findById(id);
  return Response.json({ topic }, { status: 200 });
}
