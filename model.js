const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    type: String,
    birthdate: Date,
})

module.exports = mongoose.model('User', userSchema)
