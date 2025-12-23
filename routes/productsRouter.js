const router = require('express').Router();
const { getProduct, redirectHome } = require('../controllers/productsController');
// getproducts & render them 
router.get('/:id', getProduct);
router.get('/', redirectHome);
module.exports = router;