// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { courseRoute } from "./src/app/modules/course/courseRoutes.js";
import { userRoute } from "./src/app/modules/user/userRoutes.js";
import { lessonRoute } from "./src/app/modules/lesson/lessonRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/lessons", lessonRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
