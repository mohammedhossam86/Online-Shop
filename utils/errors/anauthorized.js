const appError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class UnauthorizedError extends appError { 
    constructor(message) { 
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError;