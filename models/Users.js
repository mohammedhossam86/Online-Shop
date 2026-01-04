const mongoose = require('mongoose');
const {isEmail} = require('validator')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , 'Username Must be provided'],
    },
    email: {
        type: String,
        required: [true, 'Email Must be provided'],
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        minlength: [6, "Password must be at least 6 characters"]
    },
});
module.exports = mongoose.model('User', userSchema);