const mongoose = require('mongoose');
const User = require('../models/user');
const Skill = require('../models/skill');
const Project = require('../models/project');
const Contact = require('../models/contact');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/yourDBName';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));
