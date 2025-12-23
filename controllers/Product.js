const Product = require('../models/Products');

const getProducts = async (req, res) => {
    
    const { category } = req.query;
    const queryObject = {};
    const categorys = ['phones', 'laptops'];
    if (category && categorys.includes(category)) {
        queryObject.category = category;
    }
    try {
        const products = await Product.find(queryObject);
        res.status(200).render('index', { products });
    }
    catch (error) {
        res.status(500).send('Server Error');
    }

}


module.exports = {
    getProducts
};