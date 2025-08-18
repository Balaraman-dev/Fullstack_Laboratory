const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,  
    required: false,  
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  technologies: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill',  
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
