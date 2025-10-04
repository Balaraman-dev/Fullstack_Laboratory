const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// Get posts from followed users
router.get("/", auth, async (req, res) => {
  const followingIds = req.user.following;
  const posts = await Post.find({ author: { $in: followingIds } }).sort({ createdAt: -1 }).populate("author", "uname");
  res.json(posts);
});

module.exports = router;