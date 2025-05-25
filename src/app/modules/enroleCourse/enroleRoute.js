import express from "express";
import { enroleController } from "./enroleController.js";

const router = express.Router();

router.post("/", enroleController.enrollCourse);
router.get("/", enroleController.getAllEnrollments);
router.get("/user/:userId", enroleController.getEnrollmentsByUser);
router.get("/teacher/:teacherId", enroleController.getLastEnrollmentsOfTeacher);
router.get(
  "/recent-progress/:userId",
  enroleController.getRecentProgressByUser
);
router.patch(
  "/progress/:userId/:courseId/:lessonId",
  enroleController.updateProgress
);

export const enroleRoute = router;
