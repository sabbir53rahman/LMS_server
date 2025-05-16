import mongoose from "mongoose";
import User from "./userModel.js";

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, role, uid } = req.body;

    // Basic validation
    if (!name || !email || !role || !uid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user with this email or uid already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { uid }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email or UID already exists" });
    }

    const user = new User({ name, email, role, uid });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the current user by UID (from frontend)
const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions
export const userController = {
  getUsers,
  createUser,
  getUserById,
  getCurrentUser,
  updateUser,
  deleteUser,
};
