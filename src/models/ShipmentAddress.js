const mongoose = require('mongoose');

const shipmentAddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: String,
        city: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const ShipmentAddress = mongoose.model(
    'ShipmentAddress',
    shipmentAddressSchema
);

module.exports = ShipmentAddress;
