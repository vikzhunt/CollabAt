import mongoose from "mongoose";

const Resource = mongoose.Schema({
  Category: {
    type: String,
    required: true,
  },
  fileLink: {
    type: String,
    default: "This is a file link",
  },
  link: {
    type: String,
    default: "This is a link",
  },
});

let model = mongoose.model("Resource", Resource);
export default model;
