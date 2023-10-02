const router = require('express').Router();
const paymentController = require('../../controllers/PaymentController');

router.get('/create-checkout-session', paymentController.makePayment);
router.get('/payment-success', paymentController.paymentSuccess);
router.get('/payment-failed', paymentController.paymentFailed);

module.exports = router;
