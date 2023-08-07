const asyncHandler = require('express-async-handler');
const Product = require('../../models/Products');

const getProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    //!check if it exists
    if (!product) {
        return res.status(422).json({
            message: 'Product not found',
            code: '422',
        });
    }
    req.product = product;
    next();
});

/**
 * @desc get all variations of a given product
 * @route GET /products/:productId/variations
 * @param {string} productId
 * @returns {object}
 */
const getVariations = asyncHandler(async (req, res) => {
    res.json({
        variations: req.product.variations,
    });
});

/**
 * @desc adding variation to a product
 * @route POST /products/:productId/variations
 * @param {string} productId
 * @returns {object}
 */
const addVariation = asyncHandler(async (req, res) => {
    res.json({
        message: 'adding variation',
    });
});

module.exports = {
    addVariation,
    getVariations,
    getProduct,
};
