const asyncHandler = require('express-async-handler');
const Product = require('../models/Products');

exports.productShouldExist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    product = null;
  }

  //!check if it exists
  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
      code: 404,
    });
  }
  req.product = product;
  next();
});
