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
 * @desc add variation to a product
 * @route POST /products/:productId/variations
 * @param {string} productId
 */
router.post('/', variationController.addVariation);

module.exports = router;
