import express from "express";
import { userController } from "./userController.js";
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.get("/currentUser", userController.getCurrentUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
