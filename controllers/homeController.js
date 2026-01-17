const Product = require('../models/Products');
const categories = require('../config/categories');

const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const queryObject = {};

        if (category && category !== 'all' && categories.includes(category)) {
            queryObject.category = category;
        }

        const products = await Product.find(queryObject);

        res.render('index', {
            products,
            categories,
            query: req.query,
            isUser: req.userId,
            role: req.role
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllProducts
};