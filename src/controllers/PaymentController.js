const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const stripe = require('stripe')(
  'sk_test_51KUHzQB3tJUunZUS9z4fDi5qeVEvesG3lyPB2RSWBZ4YWPH5MIevE43UjAuH3EVKyuwnVUL36w5DvRXgFSLnkRhY0051qSBCSN'
);

const env = require('../../config/env');
console.log(env);

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
    success_url: env.payment_success_redirect,
    cancel_url: env.payment_failed_redirect,
  });

  res.redirect(303, session.url);
});

module.exports = {
  makePayment,
};
