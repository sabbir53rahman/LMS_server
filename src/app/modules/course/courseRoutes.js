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

export const courseRoute = router;
