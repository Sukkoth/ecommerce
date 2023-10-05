const asyncHandler = require('express-async-handler');
const WishList = require('../../models/WishList');
const wishListItemValidationSchema =
  require('../../validation/WishList/WishListValidationSchema').wishListItemValidationSchema;
const parseValidationErrors = require('../../utils/parseValidationErrors');

/**
 * @desc get wishlist
 * @route GET /wishlist
 * @returns {object}
 */
const getWishList = asyncHandler(async (req, res) => {
  const wishList = await WishList.findOne({ user: req.user._id });
  res.json({
    wishList,
  });
});

/**
 * @desc create a new wish item
 * @route POST /wishList
 * @returns {object}
 */
const addToWishList = asyncHandler(async (req, res) => {
  const { error: validationError, value: validated } =
    wishListItemValidationSchema.validate(req.body, { abortEarly: false });

  if (validationError) {
    res.status(422).json(parseValidationErrors(validationError.details));
  }

  const search = await WishList.findOne({
    user: req.user._id,
  });

  let found = false;
  search.items.forEach((item) => {
    if (
      item.product === validated.product &&
      item.variationIndex === validated.variationIndex
    )
      return (found = true);
  });

  if (found) {
    return res.status(409).json({
      message: 'Item is already in wishlist',
      code: '409',
    });
  }

  //TODO Make the userId from auth, remove this manual one
  const wishList = await WishList.findOneAndUpdate(
    { user: req.user._id },
    { $push: { items: validated } },
    { new: true }
  );

  res.status(201).json({
    status: 'ok',
    code: '201',
    message: 'WishList Added',
    wishList,
  });
});

/**
 * @desc delete a wishList
 * @route DELETE /wishLists/:itemId
 * @param {string} itemId
 */
const removeFroWishList = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const wishList = await WishList.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { _id: itemId } } },
    { new: true }
  );

  res.json({
    status: 'ok',
    code: '200',
    message: 'wishList item deleted',
  });
});

module.exports = {
  getWishList,
  addToWishList,
  removeFroWishList,
};
