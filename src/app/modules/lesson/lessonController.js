import Lesson from "./lessonModel";

// Add a lesson
const addLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    const saved = await lesson.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get lessons by course
const getLessonsByCourse = async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId });
  res.json(lessons);
};

// Export functions
export const lessonController = {
  addLesson,
  getLessonsByCourse,
};
