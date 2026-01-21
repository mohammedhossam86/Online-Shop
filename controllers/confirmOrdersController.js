const Cart = require('../models/Carts');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');

const getOrders = asyncWrapper(async (req, res) => {
    res.render('confirm-orders', { items: [] });
});

const postOrder = asyncWrapper(async (req, res) => {
        const cartIds = Array.isArray(req.body.cartId)
            ? req.body.cartId
            : [req.body.cartId];

        const items = await Cart.find({
            _id: { $in: cartIds },
            userId: req.userId
        });
    
        if (!items || items.length === 0) {
            throw new AppError('No valid carts found', StatusCodes.NOT_FOUND);
        }
        res.render('confirm-orders', { items });
    
});

module.exports = { getOrders, postOrder };