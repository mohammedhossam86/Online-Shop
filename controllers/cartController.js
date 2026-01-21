const Cart = require('../models/Carts')
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');
const Product = require('../models/Products');

const getCart = asyncWrapper(async (req, res) => {
    const items = await Cart.find({ userId: req.userId }).sort('timestamp');
    // console.log(req.role);
    res.render('cart', { items });
});

const save = asyncWrapper(async (req, res) => {
    const data = {
        cartId: req.body.cartId,
        amount: req.body.amount,
        timestamp: new Date(),
    }

    if(!Number.isInteger(+data.amount) || data.amount <= 0) {
        throw new AppError('Amount must be a positive integer', StatusCodes.BAD_REQUEST);
    }

    const updatedCart = await Cart.updateOne({ _id: data.cartId, userId: req.userId }, { amount: data.amount, timestamp: data.timestamp })
    
    if (updatedCart.matchedCount === 0) {
        throw new AppError('No cart with that id', StatusCodes.NOT_FOUND);
    }

    if (updatedCart.modifiedCount === 0) {
        throw new AppError('No changes made to the cart', StatusCodes.BAD_REQUEST);
    }
    res.redirect('/cart');

});

const postCart = asyncWrapper(async (req, res) => {
    const { productId , amount } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError('Product not found', StatusCodes.NOT_FOUND);
    }

    if(!Number.isInteger(+amount) || amount <= 0) {
        throw new AppError('Amount must be a positive integer', StatusCodes.BAD_REQUEST);
    }

    const userId = req.userId;
    const existingProduct = await Cart.findOne({
        productId: productId,
        userId: userId
    });
    
    if (!existingProduct)
        await Cart.create({
            name: product.name,
            price: product.price,
            amount: amount,
            productId,
            userId,
            timestamp: new Date()
        });
    else
        await Cart.findOneAndUpdate(
            { productId: productId, userId: userId },
            { $inc: { amount: amount } }
        );
    res.redirect('/cart');
    
});

const postdelete = asyncWrapper(async (req, res) => {
    const deletedCart = await Cart.deleteOne({ _id: req.body.cartId, userId: req.userId });

    if (deletedCart.deletedCount === 0) {
        throw new AppError('No cart with that id', StatusCodes.NOT_FOUND);
    }

    res.redirect('/cart');
});

const postdeleteAll = asyncWrapper(async (req, res) => {
    const data = await Cart.find({userId: req.userId});
    if (data.length === 0) {
        throw new AppError('No carts to delete', StatusCodes.NOT_FOUND);
    }
    await Cart.deleteMany({ userId: req.userId });
    res.redirect('/cart');
});

module.exports = {
    postCart,
    getCart,
    save,
    postdelete,
    postdeleteAll
}