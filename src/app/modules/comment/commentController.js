import Comment from "./commentModel.js";

const createComment = async (req, res) => {
  const { lessonId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      lesson: lessonId,
      user: req.user._id,
      content,
    });

    const populatedComment = await comment.populate("user", "name email");
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create comment", error });
  }
};

// @route   GET /api/comments/:lessonId
const getLessonComments = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const comments = await Comment.find({ lesson: lessonId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

// Export as an object
export const commentController = {
  createComment,
  getLessonComments,
};
