const router = require('express').Router({ mergeParams: true });
const variationController = require('../../controllers/Product/VariationController');

/**
 * @desc get variations of a product
 * @route GET /products/:productId/variations
 * @param {string} productId
 */
router.get(
    '/',
    variationController.getProduct,
    variationController.getVariations
);

/**
 * @desc get variation of a product by Id
 * @route GET /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variationId
 */
router.get(
    '/:variationId',
    variationController.getProduct,
    variationController.getVariationById
);

/**
 * @desc add variation to a product
 * @route POST /products/:productId/variations
 * @param {string} productId
 */
router.post(
    '/',
    variationController.getProduct,
    variationController.addVariation
);

/**
 * @desc update variation of a product
 * @route PUT /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variation
 */
router.put(
    '/:variationId',
    variationController.getProduct,
    variationController.updateVariation
);

/**
 * @desc remove variation from a product
 * @route DELETE /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variation
 */
router.delete(
    '/:variationId',
    variationController.getProduct,
    variationController.deleteVariation
);

module.exports = router;
