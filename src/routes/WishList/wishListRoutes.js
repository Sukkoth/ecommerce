const router = require('express').Router();
const WishListController = require('../../controllers/WishList/WishListController');
const authMiddleware = require('../../middleware/authMiddleware');

/**
 * @desc get wishlist
 * @route GET /wishList
 */
router.get('/', authMiddleware, WishListController.getWishList);

/**
 * @desc add wishlist
 * @route POST /wishList
 */
router.post('/', authMiddleware, WishListController.addToWishList);

/**
 * @desc delete item from wishlist
 * @route POST /wishList/:itemId
 */
router.delete('/:itemId', authMiddleware, WishListController.removeFroWishList);

module.exports = router;
