const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uname: String,
  email: String,
  bio: String,
  password: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("User", userSchema);