const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () =>
      `project_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  },
  name: { type: String, required: true },
  link: { type: String, required: true },
  img: { type: String },
  description: { type: String, required: true },
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    about: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      description: { type: String, required: true },
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    certificate: {
      name: { type: String },
      link: { type: String },
    },

    contact: {
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      location: { type: String, required: true },
      github: { type: String },
      linkedin: { type: String },
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
