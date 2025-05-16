import Lesson from "./lessonModel.js";
import Course from "../course/courseModel.js";

// Add a single lesson and update the course with the lesson reference
const addLesson = async (req, res) => {
  try {
    const { title, videoUrl, course } = req.body;

    if (!title || !course) {
      return res.status(400).json({ message: "Title and course are required." });
    }

    // 1. Create the lesson
    const newLesson = new Lesson({ title, videoUrl, course });
    const savedLesson = await newLesson.save();

    // 2. Update the corresponding course to include the new lesson
    await Course.findByIdAndUpdate(course, {
      $push: { lessons: savedLesson._id },
    });

    res.status(201).json(savedLesson);
  } catch (err) {
    console.error("Error adding lesson:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get lessons by course ID
const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId });
    res.json(lessons);
  } catch (err) {
    console.error("Error getting lessons:", err);
    res.status(400).json({ message: err.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const lessonController = {
  addLesson,
  getLessonsByCourse,
  getLessonById,
};
