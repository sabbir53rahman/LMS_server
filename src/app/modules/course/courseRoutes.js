import { courseController } from "./courseController.js";

import express from "express";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);

export const courseRoute = router;
