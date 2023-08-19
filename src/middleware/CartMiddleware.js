const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

exports.cartShouldExist = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await Cart.findById(cartId);

  //!check if it exists
  if (!cart) {
    return res.status(404).json({
      message: 'Cart not found from',
      code: '404',
    });
  }
  req.cart = cart;
  next();
});
