import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
