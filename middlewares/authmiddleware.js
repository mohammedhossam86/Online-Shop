const jwt = require('jsonwebtoken')
const jwtsecret = process.env.JWT_SECRET;
const authMiddleWare = (req,res,next) => {
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).message("Access Denied");
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.id;
        next(); 
    }
    catch (error)
    {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleWare;