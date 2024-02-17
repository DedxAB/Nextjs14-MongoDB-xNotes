import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: "string",
    description: "string",
  },
  { timestamps: true }
);


const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
