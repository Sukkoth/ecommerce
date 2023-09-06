const asyncHandler = require('express-async-handler');
const Cart = require('../../models/Cart');
const cartItemValidationSchema =
  require('../../validation/Cart/createCart').cartItemValidationSchema;
const parseValidationErrors = require('../../utils/parseValidationErrors');

/**
 * @desc Get all carts
 * @route GET /carts
 * @returns {object}
 */
const getAllCarts = asyncHandler(async (req, res) => {
  // await Cart.create({ user: req.user._id, items: [] });
  const cart = await Cart.findOne({
    user: req.user._id,
  }).populate({ path: 'items.product', model: 'Product' });

  res.json({
    status: 'ok',
    code: '200',
    data: cart,
  });
});

/**
 * @desc create a new cart
 * @route POST /carts
 * @returns {object}
 */
const addToCart = asyncHandler(async (req, res) => {
  /**
   * Take the items only since the cart is created whenever a new user is registered
   * Add new cart item to 'items' array.
   * Take, {product, variationIndex and quantity}
   */
  const { error: validationError, value: validated } =
    cartItemValidationSchema.validate(req.body, { abortEarly: false });

  if (validationError) {
    res.status(422).json(parseValidationErrors(validationError.details));
  }

  const search = await Cart.findOne({
    user: req.user._id,
  });
  let found = false;
  search.items.forEach((item) => {
    if (
      item.product === validated.product &&
      item.variationIndex === validated.variationIndex
    )
      return (found = true);
  });

  if (found) {
    return res.status(409).json({
      message: 'Item is already in cart',
      code: '409',
      product: validated.product,
      variation: validated.variationIndex,
      search,
    });
  }

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $push: { items: validated } },
    { new: true }
  );

  res.status(201).json({
    status: 'ok',
    code: '201',
    message: 'Cart added',
    cart,
  });
});

/**
 * @desc get a cart by id
 * @route GET /carts:cartId
 * @param {string} cartId
 * @returns {object}
 */
const getCartById = asyncHandler(async (req, res) => {
  //*return
  return res.json({
    status: 'ok',
    code: '200',
    data: req.cart,
  });
});

/**
 * @desc update a cart
 * @route PUT /carts:cartId
 * @param {string} cartId
 * @returns {object}
 */
const updateCart = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const cart = await Cart.findById(cartId);

  //!check if it exists
  if (!cart) {
    return res.status(422).json({
      message: 'Cart not found',
      code: '422',
    });
  }

  //* update the cart
  const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, {
    new: true,
  });
  res.json({
    status: 'ok',
    code: '200',
    message: `Cart by id ${cartId} is updated`,
    cart: updatedCart,
  });
});

/**
 * @desc delete a cart
 * @route DELETE /carts:cartId
 * @param {string} cartId
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id, 'items._id': itemId },
    { $set: { 'items.$': req.body } },
    { new: true }
  );

  res.json({
    status: 'ok',
    code: '200',
    message: 'Cart item updated',
    cart,
  });
});

/**
 * @desc delete a cart
 * @route DELETE /carts:cartId
 * @param {string} cartId
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { _id: itemId } } },
    { new: true }
  );

  res.json({
    status: 'ok',
    code: '200',
    message: 'Cart item deleted',
    cart,
  });
});

module.exports = {
  getAllCarts,
  addToCart,
  getCartById,
  updateCart,
  updateCartItem,
  removeFromCart,
};
