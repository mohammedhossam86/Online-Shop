const router = require('express').Router();
const { postCart ,getCart , save, postdelete,postdeleteAll} = require('../controllers/cartController');
const authMiddleWare = require('../middlewares/authmiddleware')
router.post('/',authMiddleWare, postCart);
router.get('/',authMiddleWare, getCart);
router.post('/save',authMiddleWare, save);
router.post('/delete',authMiddleWare, postdelete);
router.post('/delete-all',authMiddleWare, postdeleteAll);

module.exports = router;