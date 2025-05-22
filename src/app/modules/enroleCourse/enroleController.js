import Course from "../course/courseModel.js";
import Enrole from "./enroleModel.js";

// POST: Enroll in a course
const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Check if already enrolled
    const exists = await Enrole.findOne({ user: userId, course: courseId });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course." });
    }

    const enrollment = new Enrole({ user: userId, course: courseId });
    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: All enrollments
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrole.find()
      .populate("user", "name email")
      .populate("course", "title category price");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Last 10 enrollments in courses by a specific teacher
const getLastEnrollmentsOfTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    // Step 1: Get all courses created by the teacher
    const teacherCourses = await Course.find({ teacher: teacherId }).select(
      "_id title"
    );

    const courseIds = teacherCourses.map((course) => course._id);

    // Step 2: Find enrollments for those courses
    const enrollments = await Enrole.find({ course: { $in: courseIds } })
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Enrollments by user
const getEnrollmentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrole.find({ user: userId }).populate(
      "course",
      "title category price thumbnail"
    );

    // Calculate total price spent
    const totalSpent = enrollments.reduce((sum, enrollment) => {
      const price = enrollment.course?.price || 0;
      return sum + price;
    }, 0);

    res.json({ enrollments, totalSpent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enroleController = {
  enrollCourse,
  getAllEnrollments,
  getEnrollmentsByUser,
  getLastEnrollmentsOfTeacher,
};
