const router = require('express').Router();
const {getOrders , postSingleOrder , postAllOrder} = require('../controllers/confirmOrdersController')
router.get('/', getOrders);
router.post('/create-one', postSingleOrder);
router.post('/create', postAllOrder);

module.exports = router;