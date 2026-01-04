const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: String,
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    Timestamp: Number,
});

module.exports = mongoose.model('Cart', cartSchema);