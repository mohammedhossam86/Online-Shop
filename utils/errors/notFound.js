const appError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends appError { 
    constructor(message) { 
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError;