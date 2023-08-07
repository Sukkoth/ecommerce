const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneVerifiedAt: Date,
        emailVerifiedAt: Date,
        firstName: String,
        lastName: String,
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatarUrl: String,
        status: {
            enum: ['active', 'inactive', 'banned'],
            type: String,
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
