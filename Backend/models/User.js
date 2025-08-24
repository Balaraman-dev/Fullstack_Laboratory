// models/User.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    required: true
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  githubUrl: {
    type: String,
    required: false
  },
});

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  linkedin: {
    type: String,
    required: false
  },
  github: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  }
});

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: false
  },
  profileImage: {
    type: String,
    required: false
  },
  resumeUrl: {
    type: String,
    required: false
  }
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  about: aboutSchema,
  skills: [skillSchema],
  projects: [projectSchema],
  contact: contactSchema
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;