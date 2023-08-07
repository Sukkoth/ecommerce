const asyncHandler = require('express-async-handler');
const Product = require('../../models/Products');
const variationValidationSchema =
    require('../../validation/Product/createProduct').variationValidationSchema;
const parseValidationErrors = require('../../utils/parseValidationErrors');
/**
 * @desc a middleware to find product and append
 * to the request, fail if not product found
 * @type middleware
 * @returns next()
 */
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
        productId: req.product._id,
        variations: req.product.variations,
    });
});

/**
 * @desc getting variation of a product by id
 * @route GET /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variationId
 * @returns {object} variation
 */

const getVariationById = asyncHandler(async (req, res) => {
    const { variationId, productId } = req.params;

    //!check if the variation exists
    const variation = req.product.variations.find(
        (vr) => vr._id.toString() === variationId
    );

    if (!variation) {
        return res.status(422).json({
            message: 'Varitaion not found',
            code: '422',
        });
    }
    return res.json({
        status: 'ok',
        productId: req.product._id,
        variation,
    });
});

/**
 * @desc adding variation to a product
 * @route POST /products/:productId/variations
 * @param {string} productId
 * @returns {object}
 */
const addVariation = asyncHandler(async (req, res) => {
    const { error: validationError, value: validated } =
        variationValidationSchema.validate(req.body, { abortEarly: false });

    if (validationError) {
        res.status(422).json(parseValidationErrors(validationError.details));
    }

    req.product.variations.push(validated);
    await req.product.save();

    res.json({
        message: 'Variation added',
        code: '201',
        productId: req.product._id,
        variation: req.product.variations,
    });
});

/**
 * @desc updating variation of a product
 * @route PUT /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variationId
 * @returns {object} variationId
 */
const updateVariation = asyncHandler(async (req, res) => {
    const { variationId, productId } = req.params;

    //!check if the variation exists
    const variation = req.product.variations.find(
        (vr) => vr._id.toString() === variationId
    );

    if (!variation) {
        return res.status(422).json({
            message: 'Varitaion not found',
            code: '422',
        });
    }

    /**
     *  * update the variation with new fields from request body
     *  * but have to convert the previous values to raw object
     *  * to use the spread operator
     */

    const updatedVariation = {
        ...variation.toObject(), // Convert to plain object
        ...req.body,
    };

    //* now update the product using the new updated variation
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId, 'variations._id': variationId },
        {
            $set: { 'variations.$': updatedVariation },
        },
        { new: true }
    );

    res.json({
        message: 'Variation Updated',
        code: '200',
        productId: productId,
        variation: updatedProduct,
    });
});

/**
 * @desc deleting a specific variation from product
 * @route DELETE /products/:productId/variations/:variationId
 * @param {string} productId
 * @param {string} variationId
 * @returns {string} variationId
 */
const deleteVariation = asyncHandler(async (req, res) => {
    const { variationId, productId } = req.params;

    const product = await Product.findByIdAndUpdate(
        productId,
        { $pull: { variations: { _id: variationId } } },
        { new: true }
    );

    res.json({
        message: 'Variation Removed',
        code: '200',
        productId: product._id,
        variation: variationId,
    });
});

module.exports = {
    getProduct,
    addVariation,
    getVariations,
    getVariationById,
    updateVariation,
    deleteVariation,
};
