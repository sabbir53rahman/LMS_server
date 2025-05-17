import validationMiddleware from "../../../helper/zodValidator.js";
import { lessonController } from "./lessonController.js";

import express from "express";
import { lessonValidationSchema } from "./lessonValidation.js";

const router = express.Router();

// FIXED ROUTE ORDER
router.post("/", validationMiddleware(lessonValidationSchema) , lessonController.addLesson);
router.get("/lesson/:lessonId", lessonController.getLessonById);
router.get("/:courseId", lessonController.getLessonsByCourse);

export const lessonRoute = router;
