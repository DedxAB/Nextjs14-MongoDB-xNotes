import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: "string",
    description: "string",
  },
  { timestamps: true }
);

// let Topic
// if (mongoose.models.Topic) {
//   Topic = mongoose.model("Topic");
// } else {
//   Topic = mongoose.model("Topic", topicSchema);
// }
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;