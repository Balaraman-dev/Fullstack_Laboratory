// models/User.js
import mongoose from 'mongoose';

// Skill Schema
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    required: true,
  },
});

// Project Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
      required: true,
    },
  ],
  githubUrl: {
    type: String,
    required: false,
  },
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

// About Schema
const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  resumeUrl: {
    type: String,
    required: false,
  },
});

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    about: aboutSchema,
    skills: [skillSchema],
    projects: [projectSchema],
    contact: contactSchema,
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;