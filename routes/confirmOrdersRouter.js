const router = require('express').Router();
const {getOrders , postSingleOrder , postAllOrder} = require('../controllers/confirmOrdersController')
router.get('/', getOrders);
router.post('/confirm-one', postSingleOrder);
router.post('/confirm', postAllOrder);

module.exports = router;