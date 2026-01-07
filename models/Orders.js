const mongoose = require('mongoose');
const validator = require('validator');
const orderSchema = mongoose.Schema({
    FullName: {Type: String, required : true},
    phoneNumber: {
        Type: String,
        required: true,
        validate: {
            validator: (v) => {
                return validator.isMobilePhone(phoneNumber, 'ar-EG');
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    City: String,
    FullAddress: String,
})

module.exports = mongoose.model('Order', orderSchema);  