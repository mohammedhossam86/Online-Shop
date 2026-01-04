const Cart = require('../models/Carts')

const getCart = async (req,res) => {
    const items = await Cart.find({ userId: req.userId });
    
    res.render('cart' , {items});
}

const postCart = async (req,res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.userId,
            timestamp: Date.now()
        };
        await Cart.create(data);
        res.redirect('/cart');
        
    } catch (arr)
    {
        console.log(arr);
    }
}

module.exports = {
    postCart,
    getCart
}