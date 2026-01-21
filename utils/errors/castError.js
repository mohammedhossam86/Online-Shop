const appError = require('./appError');
const { StatusCodes } = require('http-status-codes');

class CastError extends appError { 
    constructor(message) { 
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = CastError;