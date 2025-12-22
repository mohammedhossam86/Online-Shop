const router = require('express').Router();
const { getProducts } = require('../controllers/Product');
// getproducts & render them 
router.get('/', getProducts);

module.exports = router;