// models/User.js
import mongoose from 'mongoose';

// Skill Schema
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  technologies: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  githubUrl: {
    type: String,
    required: false,
    trim: true,
  },
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  linkedin: {
    type: String,
    required: false,
    trim: true,
  },
  github: {
    type: String,
    required: false,
    trim: true,
  },
  website: {
    type: String,
    required: false,
    trim: true,
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
});

// About Schema
const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: false,
    min: 0,
  },
  profileImage: {
    type: String,
    required: false,
    trim: true,
  },
  resumeUrl: {
    type: String,
    required: false,
    trim: true,
  },
});

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    about: {
      type: aboutSchema,
      required: false, // Make optional for partial updates
    },
    skills: {
      type: [skillSchema],
      default: [],
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    contact: {
      type: contactSchema,
      required: false, // Make optional for partial updates
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better performance
userSchema.index({ userId: 1 });
userSchema.index({ "contact.email": 1 });

// Remove unique constraint from contact.email in schema since users might not have contact initially
contactSchema.path('email').unique = false;

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;