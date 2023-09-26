const asyncHandler = require('express-async-handler');
const orderValidationSchema = require('../../validation/Order/OrderValidationSchema');
const parseValidationErrors = require('../../utils/parseValidationErrors');
const Order = require('../../models/Order');

const placeOrder = asyncHandler(async (req, res) => {
  //store items
  const { error: validationError, value } = orderValidationSchema.validate(
    req.body,
    { abortEarly: false }
  );

  if (validationError) {
    res.status(422).json(parseValidationErrors(validationError.details));
  }

  const order = await Order.create({
    user: req.user._id,
    status: 'unpaid',
    shipmentAddress: value.shipmentAddress,
    items: value.items,
    grandTotal: value.grandTotal,
    shipmentPrice: value.shipmentPrice,
    paymentMethod: value.paymentMethod,
  });

  res.status(201).json({
    message: 'Order Placed',
    status: 'ok',
    code: '201',
    order: order,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json({
    message: 'Orders List',
    status: 'ok',
    code: '200',
    orders,
  });
});

module.exports = {
  placeOrder,
  getAllOrders,
};
