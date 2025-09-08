// models/Portfolio.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => `project_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  },
  name: { type: String, required: true },
  link: { type: String, required: true },
  img: { type: String },
  description: { type: String, required: true }
});

const portfolioSchema = new mongoose.Schema({
  about: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true }
  },
  
  projects: {
    type: [projectSchema],
    required: true,
    default: [{
      id: `project_${Date.now()}`,
      name: '',
      link: '',
      img: '',
      description: ''
    }]
  },
  
  skills: {
    type: [String],
    required: true,
    default: ['']
  },
  
  certificate: {
    name: { type: String },
    link: { type: String }
  },
  
  contact: {
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    location: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String }
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

portfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

portfolioSchema.methods.addProject = function() {
  const newProject = {
    id: `project_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: '',
    link: '',
    img: '',
    description: ''
  };
  
  this.projects.push(newProject);
  this.updatedAt = Date.now();
  return newProject;
};

portfolioSchema.methods.deleteProject = function(projectId) {
  const initialLength = this.projects.length;
  this.projects = this.projects.filter(p => p.id !== projectId);
  this.updatedAt = Date.now();
  return this.projects.length < initialLength; 
};

portfolioSchema.methods.addSkill = function() {
  this.skills.push('');
  this.updatedAt = Date.now();
};

portfolioSchema.methods.deleteSkill = function(index) {
  if (this.skills.length > 1 && index >= 0 && index < this.skills.length) {
    this.skills.splice(index, 1);
    this.updatedAt = Date.now();
    return true;
  }
  return false;
};

module.exports = mongoose.model('Portfolio', portfolioSchema);