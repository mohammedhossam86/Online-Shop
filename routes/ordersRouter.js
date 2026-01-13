const router = require('express').Router();
const {summary , confirm , cancel} = require('../controllers/ordersController')

router.get('/', summary);
router.post('/confirm', confirm);
router.post('/:id/cancel', cancel);

module.exports = router;