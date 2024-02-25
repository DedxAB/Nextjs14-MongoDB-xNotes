import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this article."],
      maxlength: [100, "Title cannot be more than 100 characters"],
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Please provide a description for this article."],
    },
    image: {
      type: String,
      require: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], // default value
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
