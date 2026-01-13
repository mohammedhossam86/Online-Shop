const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const getsignup = async (req, res) => {
    res.render('signup',{isUser:req.userId});
 };

const postsignup = async (req, res) => { 
    try {
        const { username, email, password, confirmpasswod , role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 14);
        const Taken = await User.findOne({ email });
        if (Taken) {
            return res.status(400).send('Email already registered');
        }
        // console.log(password);
        if (password !== confirmpasswod) {
            return res.status(400).send('Passwords do not match');
        }
        const allowedRoles = ["customer", "provider"];
        const safeRole = allowedRoles.includes(role) ? role : "customer";
        const user = await User.create({ username, email, password: hashedPassword, role:safeRole });
        res.redirect('/login');
    }
    catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};

const login = async (req, res) => {
    res.render('login',{err: null,isUser:req.userId});
};

const postlogin = async (req, res) => {
    try {
        const { email, password  } = req.body;
        const user = await User.findOne({ email });
        const Err = []
        if (!user) {
            return res.render('login' , {err: 'Invalid email or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.render('login' , {err: 'Invalid email or password'})
        }
        const token = jwt.sign({ userId: user._id, role:user.role }, jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        // console.log(Err);
        console.log(user);
        res.redirect("/");
    }
    catch (error) { 
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};

const logout = async (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
}
module.exports = {
    getsignup,
    postsignup,
    login,
    postlogin,
    logout
};