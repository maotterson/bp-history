const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username: 
  {
    type: String,
    required: true
  },
  password: 
  {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

module.exports = userSchema