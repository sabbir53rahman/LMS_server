import express from "express";
import { likeController } from "./likeController.js";

const router = express.Router();

router.post("/like", likeController.addLike);
router.post("/dislike", likeController.addDislike);

router.get("/like", likeController.getLike);
router.get("/dislike", likeController.getDislike);

router.get("/likes/:lessonId", likeController.getAllLikes);
router.get("/dislikes/:lessonId", likeController.getAllDislikes);

router.delete("/like", likeController.removeLike);
router.delete("/dislike", likeController.removeDislike);

export const likeRouter = router;
