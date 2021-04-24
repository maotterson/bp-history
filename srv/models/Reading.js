const mongoose = require('mongoose');

const readingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
    systolic: Number,
    diastolic: Number,
    pulse: Number
});

module.exports = mongoose.model('Reading', readingSchema);