const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pname: { type: String, required: true },
  desc: String,
  image: String,
  price: Number,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);