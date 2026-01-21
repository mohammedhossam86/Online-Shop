const Order = require('../models/Orders');
const Cart = require('../models/Carts');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');

const summary = asyncWrapper(async (req, res) => {
    const orders = await Order.find({ userId: req.userId }).sort('-createdAt');

    res.render('orders', { orders });
});

const confirm = asyncWrapper(async (req, res) => {
    const cartsId = Array.isArray(req.body.cartsId)
        ? req.body.cartsId
        : [req.body.cartsId];
    
    if (!cartsId || cartsId.length === 0) {
        throw new AppError('No carts selected', StatusCodes.BAD_REQUEST);
    }
    
    const carts = await Cart.find({
        _id: { $in: cartsId },
        userId: req.userId
    });

    if (carts.length === 0) {
        throw new AppError('No valid carts found', StatusCodes.BAD_REQUEST);
    }

    const deletedCart = await Cart.deleteMany({ _id: { $in: cartsId } , userId: req.userId });
    
    if(deletedCart.deletedCount === 0) {
        throw new AppError('No carts were deleted', StatusCodes.BAD_REQUEST);
    }
    
    const order = await Order.create({
        userId: req.userId,
        fullName: req.body.fullName,
        phone: req.body.phone,
        city: req.body.city,
        address: req.body.address,
        cartsId,
        paymentMethod: req.body.payment,
    });

    res.redirect('/orders');

});

const cancel = asyncWrapper(async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOneAndUpdate({ _id: orderId , userId: req.userId , status :'Pending' }, { status: "Canceled" }, { new: true });
    
    if (!order) {
        throw new AppError('No order with that id', StatusCodes.NOT_FOUND);
    }

    res.redirect('/orders');
});

module.exports = { summary , confirm, cancel};