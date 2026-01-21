const UnauthorizedError = require('./anauthorized');
const ForbiddenError = require('./forbidden');
const NotFoundError = require('./notFound');
const CastError = require('./castError');
const BadRequestError = require('./badRequest');

module.exports = {
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    CastError,
    BadRequestError
};