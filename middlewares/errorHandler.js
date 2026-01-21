const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/appError');

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong';

    // Handle invalid Mongo ObjectId (CastError)
    if (err.name === 'CastError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = 'Invalid ID format';
    }

    // EJS app → render error page
    if (req.accepts('html')) {
        return res.status(statusCode).render('error', {
            title: 'Error',
            message
        });
    }

    // Fallback JSON response
    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;