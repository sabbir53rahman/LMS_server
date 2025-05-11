import Course from "./courseModel";

// Get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("teacher", "name");
  res.json(courses);
};

// Get course by ID
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate("teacher", "name");
  res.json(course);
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body); // assume req.body contains teacher ID
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Export all functions
export const courseController = {
  getAllCourses,
  getCourseById,
  createCourse,
};
