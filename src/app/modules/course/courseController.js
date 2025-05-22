import Enrole from "../enroleCourse/enroleModel.js";
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

// Get courses created by a specific teacher/user
const getCoursesByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const courses = await Course.find({ teacher: userId })
      .populate("lessons")
      .populate("teacher", "name");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeacherEarnings = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    // 1. Find all courses by this teacher
    const teacherCourses = await Course.find({ teacher: teacherId });

    // 2. Extract course IDs
    const courseIds = teacherCourses.map((course) => course._id);

    // 3. Find all enrollments where course is in courseIds
    const enrollments = await Enrole.find({ course: { $in: courseIds } });

    // 4. Sum the price of enrolled courses
    let totalEarnings = 0;

    teacherCourses.forEach((course) => {
      // count how many times this course is enrolled
      const count = enrollments.filter(
        (enroll) => enroll.course.toString() === course._id.toString()
      ).length;

      totalEarnings += course.price * count;
    });

    res.json({ totalEarnings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to calculate earnings" });
  }
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

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const teacherId = req.user._id; // assuming you have middleware that sets req.user with the logged-in user's info

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the logged-in user is the teacher of the course
    if (course.teacher.toString() !== teacherId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this course" });
    }

    // Delete lessons associated with the course
    await Lesson.deleteMany({ course: courseId });

    // Delete enrollments associated with the course
    await Enrole.deleteMany({ course: courseId });

    // Delete the course itself
    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

export const courseController = {
  getAllCourses,
  getCourseById,
  createCourse,
  getCoursesByUser,
  getTeacherEarnings,
  deleteCourse,
};
