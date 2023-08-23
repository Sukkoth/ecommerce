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
  const wishList = await WishList.findOne({ user: '64d161922d094064e1c353b6' });
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
    'items.product': validated.product,
    'items.variationIndex': validated.variationIndex,
  });

  if (search) {
    return res.status(409).json({
      message: 'Item is already in wishlist',
      code: '409',
    });
  }

  //TODO Make the userId from auth, remove this manual one
  const wishList = await WishList.findOneAndUpdate(
    { user: '64d161922d094064e1c353b6' },
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
    { user: '64d161922d094064e1c353b6' },
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
