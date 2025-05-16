import Lesson from "../lesson/lessonModel.js";
import Course from "./courseModel.js";

// Get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("teacher", "name");
  res.json(courses);
};

// Get course by ID and populate lessons
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("teacher", "name")
    .populate("lessons");
  res.json(course);
};

// Create course with lessons
const createCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, category, teacher, lessons, price } =
      req.body;

    // Validate price
    if (price == null || isNaN(price)) {
      return res
        .status(400)
        .json({ message: "Price is required and must be a number." });
    }

    // 1. Create course first
    const newCourse = new Course({
      title,
      description,
      thumbnail,
      category,
      teacher,
      price,
    });

    const savedCourse = await newCourse.save();

    // 2. Create lessons and attach courseId
    const savedLessons = await Lesson.insertMany(
      (lessons || []).map((lesson) => ({
        ...lesson,
        course: savedCourse._id,
      }))
    );

    // 3. Link lessons to course
    const lessonIds = savedLessons.map((lesson) => lesson._id);
    savedCourse.lessons = lessonIds;
    await savedCourse.save();

    res.status(201).json(savedCourse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const courseController = {
  getAllCourses,
  getCourseById,
  createCourse,
};
