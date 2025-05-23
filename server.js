// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { courseRoute } from "./src/app/modules/course/courseRoutes.js";
import { userRoute } from "./src/app/modules/user/userRoutes.js";
import { lessonRoute } from "./src/app/modules/lesson/lessonRoutes.js";
import { likeRouter } from "./src/app/modules/like/likeRoutes.js";
import { commentRoute } from "./src/app/modules/comment/commentRoute.js";
import { enroleRoute } from "./src/app/modules/enroleCourse/enroleRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: ["https://lms-client-wxa2.onrender.com", "http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  // console.log("Authorization Header:", req.headers.authorization);
  next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/lessons", lessonRoute);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/enroll", enroleRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
