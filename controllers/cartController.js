const Cart = require('../models/Carts')

const getCart = async (req,res) => {
        const items = await Cart.aggregate([{ $sort: { timestamp: 1 } }]).exec();
    
        res.render('cart' , {items});
}

const save = async (req,res) => {
    try {
        const data = {
            cartId: req.body.cartId,
            amount: req.body.amount,
            timestamp : new Date(),
        }
        await Cart.updateOne({_id:data.cartId}, {amount:data.amount,timestamp:data.timestamp})
        res.redirect('/cart');
        // console.log(data.timestamp);

    } catch (err)
    {
        console.log(err);
    }
}


const postCart = async (req,res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.userId,
            timestamp: new Date()
        };
        // console.log(data.timestamp);
        await Cart.create(data);
        res.redirect('/cart');
        
    } catch (arr)
    {
        console.log(arr);
    }
}

const postdelete = async (req, res) => {
    try {
        await Cart.deleteOne({ _id: req.body.cartId });
        // const xx = Cart.findById({ _id: req.body.cartId });
        console.log(req.body.cartId);
        res.redirect('/cart');
    } catch (arr)
    {
        console.log(arr);
    }
}

const postdeleteAll = async (req,res) => {
    try {
        const data = await Cart.find()
        data.forEach(async item => {
            // console.log(item._id);
            // console.log(item.productId);
            // console.log(item.userId);
            await Cart.deleteOne({ _id: item._id });
        })
        res.redirect('/cart');
    } catch (arr)
    {
        console.log(arr);
    }
}

module.exports = {
    postCart,
    getCart,
    save,
    postdelete,
    postdeleteAll
}