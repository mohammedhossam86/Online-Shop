const router = require('express').Router();
const { getProduct, redirectHome , getAddProducts ,getProvidersProducts } = require('../controllers/productsController');
// getproducts & render them
const authMiddleWare = require('../middlewares/authmiddleware');
const allowRoles = require('../middlewares/outhMiddleWare'); 
router.get('/add', authMiddleWare , allowRoles('provider'),  getAddProducts);
router.get('/provider', authMiddleWare , allowRoles('provider'),  getProvidersProducts);
router.get('/:id', getProduct);
router.get('/', redirectHome);
module.exports = router;