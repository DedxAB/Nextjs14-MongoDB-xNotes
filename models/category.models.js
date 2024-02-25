import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
