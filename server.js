// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { courseRoute } = require("./src/app/modules/course/courseRoutes");
const { userRoute } = require("./src/app/modules/user/userRoutes");
const { lessonRoute } = require("./src/app/modules/lesson/lessonRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/lessons", lessonRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
