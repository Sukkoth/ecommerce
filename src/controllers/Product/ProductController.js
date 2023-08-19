const asyncHandler = require('express-async-handler');
const Product = require('../../models/Products');
const createProductValidation =
  require('../../validation/Product/createProduct').productValidationSchema;
const parseValidationErrors = require('../../utils/parseValidationErrors');
const ModelFeatures = require('../../utils/ModelFeatures');
/**
 * @desc Get all products
 * @route GET /products
 * @returns {object}
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const ProductFeature = new ModelFeatures(Product.find(), req);

  const products = await ProductFeature.filter().sort().selectFields().get();

  res.json({
    status: 'ok',
    code: '200',
    totalResults: await Product.countDocuments(),
    page: req.query.page,
    pageSize: req.query.limit,
    products,
  });
});

/**
 * @desc create a new product
 * @route POST /products
 * @returns {object}
 */
const createProduct = asyncHandler(async (req, res) => {
  const { error: validationError, value } = createProductValidation.validate(
    req.body,
    { abortEarly: false }
  );

  if (validationError) {
    res.status(422).json(parseValidationErrors(validationError.details));
  }

  const product = await Product.create(value);

  res.status(201).json({
    status: 'ok',
    code: '201',
    message: 'Product added',
    product,
  });
});

/**
 * @desc get a product by id
 * @route GET /products:productId
 * @param {string} productId
 * @returns {object}
 */
const getProductById = asyncHandler(async (req, res) => {
  //*return
  return res.json({
    status: 'ok',
    code: '200',
    product: req.product,
  });
});

/**
 * @desc update a product
 * @route PUT /products:productId
 * @param {string} productId
 * @returns {object}
 */
const updateProduct = asyncHandler(async (req, res) => {
  //* update the product
  const updatedProduct = await Product.findByIdAndUpdate(
    req.product._id,
    req.body,
    {
      new: true,
    }
  );
  res.json({
    status: 'ok',
    code: '200',
    message: `Product updated`,
    product: updatedProduct,
  });
});

/**
 * @desc delete a product
 * @route DELETE /products:productId
 * @param {string} productId
 * @returns {stirng} productId
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.product._id);
  res.json({
    status: 'ok',
    code: '200',
    message: `Product  deleted`,
    id: product._id,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
