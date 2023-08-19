const router = require('express').Router();
const cartController = require('../../controllers/Cart/CartController');
const cartShouldExist =
  require('../../middleware/CartMiddleware').cartShouldExist;
/**
 * @desc GET all carts
 * @route /carts
 * @method GET
 */
router.get('/', cartController.getAllCarts);

/**
 * @desc Store cart
 * @route POST /carts
 * @returns {object}
 */
router.post('/', cartController.createCart);

/**
 * @desc view a single cart
 * @route GET /carts/:cartIdp
 * @param {string} cartId
 * @returns {object}
 */
router.get('/:cartId', cartShouldExist, cartController.getCartById);

/**
 * @desc Update cart
 * @route PUT /carts/:cartId
 * @param {string} cartId
 * @returns {object}
 */
router.put('/:cartId', cartShouldExist, cartController.updateCart);

/**
 * @desc Delete cart
 * @route DELETE /carts/:cartId
 * @param {string} cartId
 * @returns {string} cartId
 */
router.delete('/:cartId', cartShouldExist, cartController.deleteCart);

// /**
//  * @desc variation routes for specific cart
//  * @route /:cartId/variations
//  * @param {string} cartId
//  */
// router.use('/:cartId/variations', variationRoutes);

module.exports = router;
