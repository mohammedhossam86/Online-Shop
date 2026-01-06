const getOrders = async (req,res) => {
    const items =[]
    res.render('orders', { items });

} 
module.exports = { getOrders };