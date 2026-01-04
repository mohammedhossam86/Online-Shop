const router = require('express').Router();
const { getAllProducts } = require('../controllers/homeController');
// getproducts & render them 
router.get('/',getAllProducts);

module.exports = router;