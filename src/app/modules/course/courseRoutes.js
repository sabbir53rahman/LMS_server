const express = require("express");
const { courseController } = require("./courseController");

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse); // protect with auth middleware later

export const courseRoute = router;
