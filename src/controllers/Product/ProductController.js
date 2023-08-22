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
  //?price[gte]=1000&difficulty=easy&page=4&sort=duration,price&fields=-image,-name&limit=3
  //?duration[gte]=10&difficulty=easy&sort=-duration,price&fields=secretTour&limit=3&page=3

  //?price[gte]=50
  const ProductFeature = new ModelFeatures(Product.find(), req);
  const ProductCount = new ModelFeatures(Product.find(), req);

  const products = await ProductFeature.filter()
    .sort()
    .selectFields()
    .paginate()
    .get();
  const productsCount = await ProductCount.filter().countDocuments();

  res.json({
    status: 'ok',
    code: '200',
    page: req.query.page,
    pageSize: req.query.limit,
    productsCount,
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

/**
 * @desc Get all products
 * @route GET /products
 * @returns {object}
 */
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).limit(4);
  res.json({
    status: 'ok',
    code: '200',
    products,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,

  getFeaturedProducts,
};
