const Product = require('../models/Products');

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

module.exports = {
    getProduct,
    redirectHome
};