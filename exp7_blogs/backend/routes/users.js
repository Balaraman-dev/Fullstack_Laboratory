
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// Get user info
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate("followers", "uname");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Get user posts
router.get("/:id/posts", async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 }).populate("author", "uname");
  res.json(posts);
});

// Follow/Unfollow user
router.post("/:id/follow", auth, async (req, res) => {
  const targetUser = await User.findById(req.params.id);
  const currentUser = req.user;  
  if (!targetUser) return res.status(404).json({ error: "User not found" });

  const isFollowing = targetUser.followers.includes(currentUser._id);
  if (isFollowing) {
    // Unfollow
    targetUser.followers.pull(currentUser._id);
    currentUser.following.pull(targetUser._id);
  } else {
    // Follow
    targetUser.followers.push(currentUser._id);
    currentUser.following.push(targetUser._id);
  }
  await targetUser.save();
  await currentUser.save();
  res.json({ success: true, following: !isFollowing });
});

// Get all users
// Search users by username
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });
  const users = await User.find({ uname: { $regex: q, $options: "i" } }).select("_id uname email");
  res.json(users);
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find().select("_id uname email");
  res.json(users);
});

// Update user profile (bio)
router.put("/:id", auth, async (req, res) => {
  if (String(req.user._id) !== req.params.id) return res.status(403).json({ error: "Not allowed" });
  const { bio } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.bio = bio;
  await user.save();
  res.json({ success: true, bio: user.bio });
});

module.exports = router;