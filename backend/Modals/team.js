import mongoose from "mongoose";

const Team = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    messages: [{
        text: String,
        file: String,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        dateRequested: { type: Date, default: Date.now },
    }],
});

let model = mongoose.model("Team", Team);
export default model;
