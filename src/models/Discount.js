const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    percentOff: {
        type: Number,
        required: true,
    },
    validUntil: Date,
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
