import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true } // you're also missing this — no createdAt/updatedAt currently
);

const Design = mongoose.model("Design", designSchema);
export default Design;