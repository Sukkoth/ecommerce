const router = require('express').Router();
const categoryController = require('../controllers/CategoryController');

/**
 * @desc GET all categories
 * @route /categories
 * @method GET
 */
router.get('/', categoryController.getAllCategories);

/**
 * @desc Store category
 * @route POST /categories
 * @returns {object}
 */
router.post('/', categoryController.createCategory);

/**
 * @desc view a single category
 * @route GET /categories/:categoryId
 * @param {string} categoryId
 * @returns {object}
 */
router.get('/:categoryId', categoryController.getCategoryById);

/**
 * @desc Update category
 * @route PUT /categories/:categoryId
 * @param {string} categoryId
 * @returns {object}
 */
router.put('/:categoryId', categoryController.updateCategory);

/**
 * @desc Delete category
 * @route DELETE /categories/:categoryId
 * @param {string} categoryId
 * @returns {string} categoryId
 */
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
