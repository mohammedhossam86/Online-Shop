const router = require('express').Router();
const { postCart ,getCart , save, postdelete} = require('../controllers/cartController');
const authMiddleWare = require('../middlewares/authmiddleware')
router.post('/',authMiddleWare, postCart);
router.get('/',authMiddleWare, getCart);
router.post('/save',authMiddleWare, save);
router.post('/delete',authMiddleWare, postdelete);

module.exports = router;