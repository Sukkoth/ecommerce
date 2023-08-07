const asyncHandler = require('express-async-handler');
const categoryValidationSchema = require('../validation/Category/createCategory');
const parseValidationErrors = require('../utils/parseValidationErrors');
const Category = require('../models/Category');
/**
 * @desc Get all categories
 * @route GET /categories
 * @returns {object}
 */
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true });
    res.json({
        status: 'ok',
        code: '200',
        categories,
    });
});

/**
 * @desc create a new category
 * @route POST /categories
 * @returns {object}
 */
const createCategory = asyncHandler(async (req, res) => {
    const { error, value } = categoryValidationSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {
        return res.status(422).json(parseValidationErrors(error.details));
    }

    const category = await Category.create(value);
    if (!category)
        return res.status(500).json({
            message: 'Could not create category',
            code: '500',
        });

    res.status(201).json({
        status: 'ok',
        code: '201',
        message: 'Category added',
        category,
    });
});

/**
 * @desc get a category by id
 * @route GET /categories:categoryId
 * @param {string} categoryId
 * @returns {object}
 */
const getCategoryById = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
        return res.status(422).json({
            code: '422',
            message: `Category not found`,
        });
    }
    res.json({
        status: 'ok',
        code: '200',
        message: `Category by id ${categoryId}`,
        category,
    });
});

/**
 * @desc update a category
 * @route PUT /categories:categoryId
 * @param {string} categoryId
 * @returns {object}
 */
const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
        return res.status(422).json({
            message: 'Category not found',
        });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        {
            new: true,
        }
    );
    res.json({
        status: 'ok',
        code: '200',
        message: `Category by id ${categoryId} is updated`,
        data: updatedCategory,
    });
});

/**
 * @desc delete a category
 * @route DELETE /categories:categoryId
 * @param {string} categoryId
 * @returns {stirng} categoryId
 */
const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
        return res.status(422).json({
            message: 'Category not found',
        });
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res.json({
        status: 'ok',
        code: '200',
        message: `Category by id ${categoryId} is deleted`,
        id: deletedCategory._id,
    });
});

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
