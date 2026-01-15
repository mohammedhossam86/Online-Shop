const Cart = require('../models/Carts');

const getOrders = async (req, res) => {
    res.render('confirm-orders', { items: [] });
};

const postOrder = async (req, res) => {
    try {
        const cartIds = Array.isArray(req.body.cartId)
            ? req.body.cartId
            : [req.body.cartId];

        const items = await Cart.find({
            _id: { $in: cartIds }
        });

        res.render('confirm-orders', { items });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { getOrders, postOrder };