const mongoose = require('mongoose');
const readingSchema = require('../schemas/ReadingSchema')

module.exports = mongoose.model('Reading', readingSchema);