const Product = require('../models/Products');
const categories = require('../config/categories');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');

const getProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new AppError('Product not found', StatusCodes.NOT_FOUND);
    }
    const isOwner =
        req.userId &&
        req.role === 'provider' &&
        product.provider.toString() === req.userId;

    res.render('products', {
        product,
        isOwner
    });
});

const redirectHome = (req, res) => {
    res.redirect('/');
};

const getAddProducts = (req, res) => {
    res.render('add-products', { categories });
};

const getProvidersProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({ provider: req.userId });
    res.render('provider-products', { products });
});

const postProducts = asyncWrapper(async (req, res) => {
    if (!req.file) {
        throw new AppError('Image file is required', StatusCodes.BAD_REQUEST);
    }

    const { name, description, price, category, stock } = req.body;

    if (
        !name ||
        !description ||
        !category ||
        !Number.isFinite(+price) ||
        +price < 0 ||
        !Number.isInteger(+stock) ||
        +stock < 0
    ) {
        throw new AppError('Invalid product data', StatusCodes.BAD_REQUEST);
    }

    if (!categories.includes(category)) {
        throw new AppError('Invalid category', StatusCodes.BAD_REQUEST);
    }

    const safeName = name
        .replace(/[^a-z0-9]/gi, '-')
        .toLowerCase();

    const ext = path.extname(req.file.originalname).toLowerCase();
    const filename = `${Date.now()}-${safeName}${ext}`;

    const newProduct = await Product.create({
        name,
        description,
        price:+price,
        category,
        stock:+stock,
        provider: req.userId,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            filename
        }
    });

    res.redirect('/products/provider');

});
    
const getProductImage = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id).select('image');

    if (!product || !product.image || !product.image.data) {
        throw new AppError('Image not found', StatusCodes.NOT_FOUND);
    }

    res.set('Content-Type', product.image.contentType);
    res.send(product.image.data);
});

module.exports = {
    getProduct,
    redirectHome,
    getAddProducts,
    getProvidersProducts,
    postProducts,
    getProductImage
};