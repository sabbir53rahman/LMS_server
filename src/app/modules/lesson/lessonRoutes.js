const express = require("express");
const { lessonController } = require("./lessonController");

const router = express.Router();

router.post("/", lessonController.addLesson);
router.get("/:courseId", lessonController.getLessonsByCourse);

export const lessonRoute = router;
