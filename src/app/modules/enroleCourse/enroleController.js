
import Course from "../course/courseModel.js";
import Enrole from "./enroleModel.js";

// POST: Enroll in a course
const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Check if already enrolled
    const exists = await Enrole.findOne({ user: userId, course: courseId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled in this course." });
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

// GET: Enrollments by user
const getEnrollmentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrole.find({ user: userId })
      .populate("course", "title category price thumbnail");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enroleController = {
  enrollCourse,
  getAllEnrollments,
  getEnrollmentsByUser,
};
