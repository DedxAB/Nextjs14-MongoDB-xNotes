import connectDB from "@/helper/mongodb";
import Topic from "@/models/topic.model";

export async function PATCH(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDescription: description,
    newTags: tags,
    newWebsiteLink: websiteLink,
  } = await req.json();
  await connectDB();
  // Update the contentUpdatedAt field along with title and description for only the updated note
  await Topic.findByIdAndUpdate(id, {
    title,
    description,
    tags,
    websiteLink,
    contentUpdatedAt: Date.now(),
  });
  return Response.json({ message: "Note updated" }, { status: 200 });
}

export async function GET(_req, { params }) {
  const { id } = params;
  await connectDB();
  //   const topic = await Topic.findOne({ _id: id });
  const topic = await Topic.findById(id).populate("author");
  return Response.json({ topic }, { status: 200 });
}
