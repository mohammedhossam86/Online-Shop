const router = require('express').Router();
const {getsignup, postsignup, login , postlogin , logout} = require('../controllers/authController');
router.route('/signup').get(getsignup).post(postsignup);
router.get('/login', login);
router.post('/login', postlogin);
router.post('/logout', logout);
module.exports = router;