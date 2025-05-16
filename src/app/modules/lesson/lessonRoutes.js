import { lessonController } from "./lessonController.js";

import express from "express";

const router = express.Router();

// FIXED ROUTE ORDER
router.post("/", lessonController.addLesson);
router.get("/lesson/:lessonId", lessonController.getLessonById); // put this first!
router.get("/:courseId", lessonController.getLessonsByCourse);

export const lessonRoute = router;
