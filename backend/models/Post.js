import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
            type: Number,
            default: 0,
        },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

const Post = mongoose.model("Post", postSchema);

export default Post;