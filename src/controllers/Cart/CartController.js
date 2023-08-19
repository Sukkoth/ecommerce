const asyncHandler = require('express-async-handler');
const Cart = require('../../models/Cart');
const cartValidationSchema =
  require('../../validation/Cart/createCart').cartValidationSchema;
const parseValidationErrors = require('../../utils/parseValidationErrors');

/**
 * @desc Get all carts
 * @route GET /carts
 * @returns {object}
 */
const getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  res.json({
    status: 'ok',
    code: '200',
    data: carts,
  });
});

/**
 * @desc create a new cart
 * @route POST /carts
 * @returns {object}
 */
const createCart = asyncHandler(async (req, res) => {
  const { error: validationError, value: validated } =
    cartValidationSchema.validate(req.body, { abortEarly: false });

  if (validationError) {
    res.status(422).json(parseValidationErrors(validationError.details));
  }

  const cart = await Cart.create(validated);

  res.status(201).json({
    status: 'ok',
    code: '201',
    message: 'Cart added',
    data: cart,
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
 * @returns {stirng} cartId
 */
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.cart._id);

  res.json({
    status: 'ok',
    code: '200',
    message: `Cart  deleted`,
    id: cart._id,
  });
});

module.exports = {
  getAllCarts,
  createCart,
  getCartById,
  updateCart,
  deleteCart,
};
