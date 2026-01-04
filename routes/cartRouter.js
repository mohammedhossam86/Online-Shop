const router = require('express').Router();
const { postCart ,getCart} = require('../controllers/cartController');
const authMiddleWare = require('../middlewares/authmiddleware')
router.post('/',authMiddleWare, postCart);
router.get('/',authMiddleWare, getCart);

module.exports = router;