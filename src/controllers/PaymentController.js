const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const env = require('../../config/env');

const makePayment = asyncHandler(async (req, res) => {
  const orderId = req.query.orderId;
  const order = await Order.findById(orderId).populate('items.product');
  const line_items = order.items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product.name,
        images: item.product.variations[item.variationIndex].images.map(
          (image) => env.APP_URL + `/images/products/${image}`
        ),
      },
      unit_amount:
        Math.round(item.product.variations[item.variationIndex].price) * 100,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    metadata: {
      orderId: orderId,
    },
    success_url:
      env.app_url + '/payment-success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: env.app_url + '/payment-failed',
  });

  res.redirect(303, session.url);
});

const paymentSuccess = asyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const orderId = session.metadata.orderId;
  await Order.findByIdAndUpdate(orderId, { status: 'pending' }, { new: true });

  res.redirect(302, env.front_end_url + '/orders');
});

const paymentFailed = asyncHandler(async (req, res) => {
  return res.redirect(302, env.front_end_url + '/orders');
});

module.exports = {
  makePayment,
  paymentFailed,
  paymentSuccess,
};
