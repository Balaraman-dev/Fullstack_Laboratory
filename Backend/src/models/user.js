const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill', 
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',  
  }],
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact', 
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
