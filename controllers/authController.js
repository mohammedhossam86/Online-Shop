const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/errors/appError');

const getsignup = asyncWrapper(async (req, res) => {
    res.render('signup',{isUser:req.userId});
 });

const postsignup = asyncWrapper(async (req, res) => { 

    const { username, email, password, confirmpasswod , role } = req.body;
    const Taken = await User.findOne({ email });
    if (Taken) {
        throw new AppError('Email already registered', StatusCodes.BAD_REQUEST);
    }
    if (password !== confirmpasswod) {
        throw new AppError('Passwords do not match', StatusCodes.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    const allowedRoles = ["customer", "provider"];
    const safeRole = allowedRoles.includes(role) ? role : "customer";
    const user = await User.create({ username, email, password: hashedPassword, role:safeRole });
    res.redirect('/login');
});

const login = asyncWrapper(async (req, res) => {
    res.render('login',{err: null,isUser:req.userId});
});

const postlogin = asyncWrapper(async (req, res) => {
    const { email, password  } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid email or password', StatusCodes.UNAUTHORIZED);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new AppError('Invalid email or password', StatusCodes.UNAUTHORIZED);
    }
    const token = jwt.sign({ userId: user._id, role:user.role }, jwtSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    console.log(user);
    res.redirect("/");
});

const logout = asyncWrapper(async (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    getsignup,
    postsignup,
    login,
    postlogin,
    logout
};