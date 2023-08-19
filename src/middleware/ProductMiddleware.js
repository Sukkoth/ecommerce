const asyncHandler = require('express-async-handler');
const Product = require('../models/Products');

exports.productShouldExist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  //!check if it exists
  if (!product) {
    return res.status(404).json({
      message: 'Product not found from',
      code: '404',
    });
  }
  req.product = product;
  next();
});
