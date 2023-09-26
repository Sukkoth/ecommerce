const router = require('express').Router();
const paymentController = require('../../controllers/PaymentController');

router.get('/create-checkout-session', paymentController.makePayment);

module.exports = router;
