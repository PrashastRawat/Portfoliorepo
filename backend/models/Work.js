import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        slug:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        githubLink:{
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        image:{
            type: String,
            trim: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

const Work = mongoose.model("Work", workSchema)

export default Work