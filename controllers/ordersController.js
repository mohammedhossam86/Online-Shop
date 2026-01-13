const Order = require('../models/Orders');

const summary = async (req, res) => {
    const orders = await Order.find();
    res.render('orders' , {orders})
}

const confirm = async (req , res) => {
    const cartsId = Array.isArray(req.body.cartsId)
            ? req.body.cartsId
            : [req.body.cartsId];
     
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        city: req.body.city,
        address: req.body.address,        
        cartsId: cartsId,
        paymentMethod:req.body.payment
    }    
    console.log(data);
    const order = await Order.create( data );
    res.redirect('/orders');

}

const cancel = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOneAndUpdate({ _id: orderId }, { status: "Canceled" });
    res.redirect('/orders');
}
module.exports = { summary , confirm, cancel};