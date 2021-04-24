const mongoose = require('mongoose');
const Reading = require('./Reading');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    readings: [Reading]
});

module.exports = mongoose.model('User', userSchema);