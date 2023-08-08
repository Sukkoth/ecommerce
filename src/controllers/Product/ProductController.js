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
  const { productId } = req.params;
  const product = await Product.findById(productId);

  //!check if it exists
  if (!product) {
    return res.status(422).json({
      message: 'Product not found',
      code: '422',
    });
  }

  //*return
  return res.json({
    status: 'ok',
    code: '200',
    message: `Product by id ${productId}`,
    product: product,
  });
});

/**
 * @desc update a product
 * @route PUT /products:productId
 * @param {string} productId
 * @returns {object}
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  //!check if it exists
  if (!product) {
    return res.status(422).json({
      message: 'Product not found',
      code: '422',
    });
  }

  //* update the product
  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.json({
    status: 'ok',
    code: '200',
    message: `Product by id ${productId} is updated`,
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
  const { productId } = req.params;
  res.json({
    status: 'ok',
    code: '200',
    message: `Product by id ${productId} is deleted`,
    id: productId,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
