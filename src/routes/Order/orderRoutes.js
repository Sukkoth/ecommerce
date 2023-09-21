const router = require('express').Router();
const OrderController = require('../../controllers/Order/OrderController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, OrderController.placeOrder);

module.exports = router;
