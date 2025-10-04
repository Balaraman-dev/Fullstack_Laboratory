const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Create a post
router.post("/", auth, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content required" });
  const post = new Post({ author: req.user._id, content });
  await post.save();
  await post.populate("author", "uname");
  res.json(post);
});

// Get all posts for current user
router.get("/me", auth, async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 }).populate("author", "uname");
  res.json(posts);
});

// Get a single post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "uname");
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// Delete a post
router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (String(post.author) !== String(req.user._id)) return res.status(403).json({ error: "Not allowed" });
  await post.deleteOne();
  res.json({ success: true });
});

// Like a post
router.post("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  post.likes = post.likes || [];
  const idx = post.likes.indexOf(req.user._id);
  if (idx === -1) post.likes.push(req.user._id);
  else post.likes.splice(idx, 1);
  await post.save();
  await post.populate("author", "uname");
  res.json({ success: true, likes: post.likes.length, post });
});

// Get all posts (for feeds)
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "uname");
  res.json(posts);
});

module.exports = router;
