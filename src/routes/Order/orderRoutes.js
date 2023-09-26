const router = require('express').Router();
const OrderController = require('../../controllers/Order/OrderController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, OrderController.placeOrder);
router.get('/', authMiddleware, OrderController.getAllOrders);

module.exports = router;
