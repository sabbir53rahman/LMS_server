import Like from "./likeModel.js";


const addLike = async (req, res) => {
  try {
    const { lessonId, userId } = req.body;

    await Like.deleteOne({ lessonId, userId, reaction: "dislike" });

    const newLike = new Like({ lessonId, userId, reaction: "like" });
    await newLike.save();

    const populatedLike = await Like.findById(newLike._id)
      .populate("lessonId")
      .populate("userId");

    res.status(201).json(populatedLike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDislike = async (req, res) => {
  try {
    const { lessonId, userId } = req.body;

    await Like.deleteOne({ lessonId, userId, reaction: "like" });

    const newDislike = new Like({ lessonId, userId, reaction: "dislike" });
    await newDislike.save();

    const populatedDislike = await Like.findById(newDislike._id)
      .populate("lessonId")
      .populate("userId");

    res.status(201).json(populatedDislike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLike = async (req, res) => {
  try {
    const { lessonId, userId } = req.query;
    const result = await Like.findOne({ lessonId, userId, reaction: "like" })
      .populate("lessonId")
      .populate("userId");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDislike = async (req, res) => {
  try {
    const { lessonId, userId } = req.query;
    const result = await Like.findOne({ lessonId, userId, reaction: "dislike" })
      .populate("lessonId")
      .populate("userId");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const results = await Like.find({ lessonId, reaction: "like" })
      .populate("lessonId")
      .populate("userId");

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDislikes = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const results = await Like.find({ lessonId, reaction: "dislike" })
      .populate("lessonId")
      .populate("userId");

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const { lessonId, userId } = req.query;
    const result = await Like.deleteOne({ lessonId, userId, reaction: "like" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeDislike = async (req, res) => {
  try {
    const { lessonId, userId } = req.query;
    const result = await Like.deleteOne({ lessonId, userId, reaction: "dislike" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeController = {
  addLike,
  addDislike,
  getLike,
  getDislike,
  getAllLikes,
  getAllDislikes,
  removeLike,
  removeDislike,
};
