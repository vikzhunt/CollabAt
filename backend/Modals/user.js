import mongoose from "mongoose";

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  interest: {
    type: [String],
    default: [],
  },
  techSkills: {
    type: [String],
    default: [],
  },
  resume: {
    type: String,
    default: "This is a resume link",
  },
});

let model = mongoose.model("User", user);
export default model;
