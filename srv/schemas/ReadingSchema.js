const mongoose = require('mongoose');

const readingSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    min: '2020-01-01',
    max: Date.now,
    default: Date.now
  },
  systolic: {
    type: Number,
    min: 30,
    max: 300,
    required: true
  },
  diastolic: {
    type: Number,
    min: 30,
    max: 300,
    required: true
  },
  pulse: {
    type: Number,
    min: 30,
    max: 300,
    required: true
  },
});

module.exports = readingSchema