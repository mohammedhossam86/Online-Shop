const Product = require('../models/Products');
const categories = require('../config/categories');

const getProduct = async (req, res) => { 
    // render single product details page
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        console.log(product);
        res.status(200).render('products', { product });
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
}

const redirectHome = async (req, res) => {
    res.status(302).redirect('/');
}

const getAddProducts = async (req, res) => {
    res.render('add-products', {
        categories,
    });
}

const getProvidersProducts = async (req, res) => { 
    const products = await Product.find({ provider: req.userId });
    res.render('provider-products', { products });
}

module.exports = {
    getProduct,
    redirectHome,
    getAddProducts,
    getProvidersProducts
};