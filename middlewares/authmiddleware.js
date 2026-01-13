const jwt = require('jsonwebtoken')
const jwtsecret = process.env.JWT_SECRET;
const authMiddleWare = (req,res,next) => {
    const token = req.cookies.token;
    if(!token)
    {
        return res.redirect('/login')
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next(); 
    }
    catch (error)
    {
        return res.redirect('/login')
    }
}

module.exports = authMiddleWare;