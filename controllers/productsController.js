const Product = require('../models/Products');
const categories = require('../config/categories');
const path = require('path');

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).render('products', { product: null });
        }
        const isOwner =
            req.userId &&
            req.role === 'provider' &&
            product.provider.toString() === req.userId;

        res.render('products', {
            product,
            isOwner
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const redirectHome = (req, res) => {
    res.redirect('/');
};

const getAddProducts = (req, res) => {
    res.render('add-products', { categories });
};

const getProvidersProducts = async (req, res) => {
    try {
        const products = await Product.find({ provider: req.userId });
        res.render('provider-products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const postProducsts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Product image is required');
        }

        const { name, description, price, category, stock } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).send('All fields are required');
        }

        const safeName = name
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();

        const ext = path.extname(req.file.originalname).toLowerCase();
        const filename = `${Date.now()}-${safeName}${ext}`;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            provider: req.userId,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                filename
            }
        });

        await newProduct.save();

        res.redirect('/products/provider');

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

const getProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select('image');

        if (!product || !product.image || !product.image.data) {
            return res.status(404).send('Image not found');
        }

        res.set('Content-Type', product.image.contentType);
        res.send(product.image.data);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProduct,
    redirectHome,
    getAddProducts,
    getProvidersProducts,
    postProducsts,
    getProductImage
};