const router = require('express').Router();
const productController = require('../../controllers/Product/ProductController');
const variationRoutes = require('../Product/variationRoutes');
const productShouldExist =
  require('../../middleware/ProductMiddleware').productShouldExist;
/**
 * @desc GET all products
 * @route /products
 * @method GET
 */
router.get('/', productController.getAllProducts);

/**
 * @desc Store product
 * @route POST /products
 * @returns {object}
 */
router.post('/', productController.createProduct);

/**
 * @desc view a single product
 * @route GET /products/:productId
 * @param {string} productId
 * @returns {object}
 */
router.get('/:productId', productShouldExist, productController.getProductById);

/**
 * @desc Update product
 * @route PUT /products/:productId
 * @param {string} productId
 * @returns {object}
 */
router.put('/:productId', productShouldExist, productController.updateProduct);

/**
 * @desc Delete product
 * @route DELETE /products/:productId
 * @param {string} productId
 * @returns {string} productId
 */
router.delete(
  '/:productId',
  productShouldExist,
  productController.deleteProduct
);

/**
 * @desc variation routes for specific product
 * @route /:productId/variations
 * @param {string} productId
 */
router.use('/:productId/variations', variationRoutes);

module.exports = router;
