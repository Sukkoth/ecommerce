const mongoose = require('mongoose');

const wishListItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  variationIndex: {
    type: Number,
    required: true,
  },
});

const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [wishListItemSchema],
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
