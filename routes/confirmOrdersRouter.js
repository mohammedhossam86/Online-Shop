const router = require('express').Router();
const {getOrders , postOrder , postAllOrder} = require('../controllers/confirmOrdersController')
router.get('/', getOrders);
router.post('/', postOrder);

module.exports = router;