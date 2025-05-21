import express from "express";
import { enroleController } from "./enroleController.js";

const router = express.Router();

// POST /api/v1/enroll - Enroll in a course
router.post("/", enroleController.enrollCourse);

// GET /api/v1/enroll - Get all enrollments
router.get("/", enroleController.getAllEnrollments);

// GET /api/v1/enroll/user/:userId - Get enrollments by user
router.get("/user/:userId", enroleController.getEnrollmentsByUser);

export const enroleRoute = router;
