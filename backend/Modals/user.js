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
  connectionRequests: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      message: { type: String }, // Optional message from the requester
      dateRequested: { type: Date, default: Date.now },
    },
  ],
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resume: {
    type: String,
    default: "This is a resume link",
  },
});

let model = mongoose.model("User", user);
export default model;
