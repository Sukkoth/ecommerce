const dotenv = require('dotenv').config();
const env = {
    app_port: process.env.APP_PORT,
    db_url: process.env.DB_URL_ATLAS || 'mongodb://localhost:27017/eShop',
};

module.exports = env;
