const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: String,
  password: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);