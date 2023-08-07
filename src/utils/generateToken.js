const jwt = require('jsonwebtoken');
const env = require('../../config/env');

const generateToken = (id) => {
    const token = jwt.sign({ id }, env.app_key, {
        expiresIn: '1d',
    });

    return token;
};

module.exports = generateToken;
