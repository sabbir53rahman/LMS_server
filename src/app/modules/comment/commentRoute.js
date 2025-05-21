import express from "express";
import { protect } from "../../jwt/authMiddleware.js";
import { commentController } from "./commentController.js";

const router = express.Router();

router.post("/:lessonId", protect, commentController.createComment);
router.get("/:lessonId", commentController.getLessonComments);

export const commentRoute = router;
