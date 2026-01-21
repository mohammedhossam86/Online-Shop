const appError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class ForbiddenError extends appError { 
    constructor(message) { 
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = ForbiddenError;