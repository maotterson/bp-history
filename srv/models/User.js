const mongoose = require('mongoose');
const ReadingSchema = require('../schemas/ReadingSchema')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    readings: [ReadingSchema]
});

module.exports = mongoose.model('User', userSchema);