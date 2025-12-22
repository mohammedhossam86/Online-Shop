const Product = require('../models/Products');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Error retrieving products');
    }
}


module.exports = {
    getProducts
};