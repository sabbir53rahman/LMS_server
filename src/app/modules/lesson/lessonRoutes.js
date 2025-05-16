import { lessonController } from "./lessonController.js";

import express from "express";

const router = express.Router();

router.post("/", lessonController.addLesson);
router.get("/:courseId", lessonController.getLessonsByCourse);

export const lessonRoute = router;
