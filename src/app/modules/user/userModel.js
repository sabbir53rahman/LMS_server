import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,   // removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // store emails lowercase for consistency
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher"],  // only allow these roles
    },
    uid: {
      type: String,
      required: true,
      unique: true,  // UID must be unique as it's from Firebase
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
