const Cart = require('../models/Carts')

const getOrders = async (req, res) => {
    const items = [];
    res.render('confirm-orders', { items });
} 

const postSingleOrder = async (req, res) => {
    try{
        const cartId = req.body.cartId;
        const items = [];
        for (let i = 0; i < cartId.length; i++) {
            const item = await Cart.findById(cartId[i]);
            items.push(item);
        }
        console.log(items);

        // res.redirect('/orders');
        res.render('confirm-orders', { items });
    } catch (err)
    {
        console.log(err);
    }
}

const postAllOrder = async (req, res) => {
    try{
        const cartId = req.body.cartId;
        const items = [];
        for (let i = 0; i < cartId.length; i++) {
            const item = await Cart.findById(cartId[i]);
            items.push(item);
        }
        console.log(items);
        // res.redirect('/orders');
        res.render('confirm-orders', { items });
    } catch (err)
    {
        console.log(err);
    }
}

module.exports = { getOrders , postSingleOrder, postAllOrder};