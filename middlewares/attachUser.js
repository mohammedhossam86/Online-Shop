const jwt = require('jsonwebtoken');

const attachUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.isUser = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.isUser = decoded.userId;
        req.userId = decoded.userId;
        req.role = decoded.role;
    } catch {
        res.locals.isUser = null;
    }

    next();
};

module.exports = attachUser;
