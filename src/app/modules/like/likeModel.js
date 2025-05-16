import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reaction: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
}, { timestamps: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;
