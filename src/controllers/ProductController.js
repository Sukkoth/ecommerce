const asyncHandler = require('express-async-handler');

/**
 * @desc Get all products
 * @route GET /products
 * @returns {object}
 */
const getAllProducts = asyncHandler(async (req, res) => {
    res.json({
        status: 'ok',
        code: '200',
        products: [
            {
                id: '1234',
                name: 'Samsung Ultra 22',
                description: 'lorem ipsum dollor',
            },
        ],
    });
});

/**
 * @desc create a new product
 * @route POST /products
 * @returns {object}
 */
const createProduct = asyncHandler(async (req, res) => {
    res.status(201).json({
        status: 'ok',
        code: '201',
        message: 'Product added',
        data: 'product',
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
    res.json({
        status: 'ok',
        code: '200',
        message: `Product by id ${productId}`,
        data: 'single product data',
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
    res.json({
        status: 'ok',
        code: '200',
        message: `Product by id ${productId} is updated`,
        data: 'single product data',
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
