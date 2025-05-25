import Course from "../course/courseModel.js";
import Enrole from "./enroleModel.js";
import Lesson from "../lesson/lessonModel.js";

// POST: Enroll in a course
const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
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
    const teacherCourses = await Course.find({ teacher: teacherId }).select(
      "_id title"
    );

    const courseIds = teacherCourses.map((course) => course._id);

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

    const totalSpent = enrollments.reduce((sum, enrollment) => {
      const price = enrollment.course?.price || 0;
      return sum + price;
    }, 0);

    res.json({ enrollments, totalSpent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Last 3 enrolled courses with progress
const getRecentProgressByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrole.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate({
        path: "course",
        select: "title lessons thumbnail",
        populate: {
          path: "lessons",
          select: "_id",
        },
      });

    const progress = enrollments.map((enrollment) => {
      const totalLessons = enrollment.course.lessons.length;
      const completedLessons = enrollment.completedLessons
        ? enrollment.completedLessons.length
        : 0;

      const percentage =
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

      return {
        courseId: enrollment.course._id,
        title: enrollment.course.title,
        thumbnail: enrollment.course.thumbnail,
        totalLessons,
        completedLessons,
        percentage,
      };
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH: Update lesson progress
const updateProgress = async (req, res) => {
  const { userId, courseId, lessonId } = req.params;

  try {
    const enrollment = await Enrole.findOne({ user: userId, course: courseId });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }

    const alreadyCompleted = enrollment.completedLessons.includes(lessonId);
    if (!alreadyCompleted) {
      enrollment.completedLessons.push(lessonId);
      await enrollment.save();
    }

    res.status(200).json({ message: "Progress updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enroleController = {
  enrollCourse,
  getAllEnrollments,
  getEnrollmentsByUser,
  getLastEnrollmentsOfTeacher,
  getRecentProgressByUser,
  updateProgress, 
};
