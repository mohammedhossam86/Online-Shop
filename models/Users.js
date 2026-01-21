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
    role: {
        type: String,
        required: true,
        default: "customer",
        enum:["customer" , "admin" , "provider"]
    }
});

userSchema.methods.isCustomer = function () { 
    return this.role === 'customer';
}
userSchema.methods.isAdmin = function () { 
    return this.role === 'Admin';
}
userSchema.methods.isProvider = function () { 
    return this.role === 'provider';
}
userSchema.methods.hasRole = function (...roles) {
    return roles.includes(this.role);
};
module.exports = mongoose.model('User', userSchema);