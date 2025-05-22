import validationMiddleware from "../../../helper/zodValidator.js";
import { courseController } from "./courseController.js";

import express from "express";
import { courseValidationSchema } from "./courseValidation.js";
import { protect } from "../../jwt/authMiddleware.js";

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post(
  "/",
  protect,
  validationMiddleware(courseValidationSchema),
  courseController.createCourse
);
router.get("/user/:userId", courseController.getCoursesByUser);
router.get("/earnings/:teacherId", courseController.getTeacherEarnings);

router.delete("/:id", protect, courseController.deleteCourse);

export const courseRoute = router;
