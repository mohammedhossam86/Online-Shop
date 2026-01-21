const AppError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class BadRequestError extends AppError { 
    constructor(message) { 
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError;