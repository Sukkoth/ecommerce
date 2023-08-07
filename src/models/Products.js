const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    name: String,
    value: String,
});

const variationSchema = new mongoose.Schema({
    attributes: [attributeSchema],
    stockQuantity: Number,
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        imageUrl: {
            type: String,
            default: 'default_product_image.jpg',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        variations: [variationSchema],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
