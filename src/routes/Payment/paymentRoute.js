const router = require('express').Router();
const paymentController = require('../../controllers/PaymentController');

router.post('/create-checkout-session', paymentController.makePayment);

module.exports = router;
