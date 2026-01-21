const Product = require('../models/Products');
const categories = require('../config/categories');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');

const getAllProducts = asyncWrapper(async (req, res) => {
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
});

module.exports = {
    getAllProducts
};