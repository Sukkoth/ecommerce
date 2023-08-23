const router = require('express').Router();
const WishListController = require('../../controllers/WishList/WishListController');

/**
 * @desc get wishlist
 * @route GET /wishList
 */
router.get('/', WishListController.getWishList);

/**
 * @desc add wishlist
 * @route POST /wishList
 */
router.post('/', WishListController.addToWishList);

/**
 * @desc delete item from wishlist
 * @route POST /wishList/:itemId
 */
router.delete('/:itemId', WishListController.removeFroWishList);

module.exports = router;
