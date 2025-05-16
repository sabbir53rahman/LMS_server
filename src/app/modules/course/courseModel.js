import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    thumbnail: String,
    category: String,
    price: { type: Number, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
