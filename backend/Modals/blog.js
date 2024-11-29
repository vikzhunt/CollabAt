import mongoose from "mongoose";

const Blog = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    author: {
        type: String,
        default: "",
    },
});

let model = mongoose.model("Blog", Blog);
export default model;
