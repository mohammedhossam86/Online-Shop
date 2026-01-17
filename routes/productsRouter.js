const router = require('express').Router();
const { getProduct, redirectHome , getAddProducts ,getProvidersProducts , postProducsts , getProductImage} = require('../controllers/productsController');
// getproducts & render them
const uploadImage = require('../middlewares/uploadImages');
const authMiddleWare = require('../middlewares/authmiddleware');
const allowRoles = require('../middlewares/outhMiddleWare'); 
router.get('/add', authMiddleWare , allowRoles('provider'),  getAddProducts);
router.get('/provider', authMiddleWare , allowRoles('provider'),  getProvidersProducts);
router.post('/', authMiddleWare , allowRoles('provider'), uploadImage.single('image'), postProducsts);
router.get('/:id/image', getProductImage);
router.get('/:id', getProduct);
router.get('/', redirectHome);
module.exports = router;