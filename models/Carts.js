const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: String,
    name: String,
    price: Number,
    amount: Number,
    productId: String,
    timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Cart', cartSchema);