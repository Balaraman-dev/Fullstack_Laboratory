const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
  },
  githubProfile: {
    type: String,  
    required: false,  
  },
  linkedinProfile: {
    type: String,  
    required: false, 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
