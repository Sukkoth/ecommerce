const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(
  'sk_test_51KUHzQB3tJUunZUS9z4fDi5qeVEvesG3lyPB2RSWBZ4YWPH5MIevE43UjAuH3EVKyuwnVUL36w5DvRXgFSLnkRhY0051qSBCSN'
);

const makePayment = asyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'pr_120',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.FRONT_END_URL}?success=true`,
    cancel_url: `${process.env.FRONT_END_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = {
  makePayment,
};
