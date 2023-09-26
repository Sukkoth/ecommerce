const dotenv = require('dotenv').config();
const env = {
  app_port: process.env.APP_PORT,
  db_url: process.env.DB_URL_ATLAS || 'mongodb://localhost:27017/eShop',
  app_key:
    process.env.APP_KEY ||
    'e8b495f1b7458a24a5cb2a9c14d8d39c8f0f07a7d5c634878c2e70412687628d',
  app_mode: process.env.APP_MODE || 'DEV',
  front_end_url:
    process.env.APP_MODE === 'DEV'
      ? 'http://localhost:5173'
      : process.env.FRONT_END_URL,
  payment_success_redirect:
    process.env.APP_MODE === 'DEV'
      ? 'http://localhost:5173'
      : process.env.FRONT_END_URL, // + '/payment-success',
  payment_failed_redirect:
    process.env.APP_MODE === 'DEV'
      ? 'http://localhost:5173'
      : process.env.FRONT_END_URL, //+ '/payment-failed',
  app_url:
    process.env.APP_MODE === 'DEV'
      ? `http://localhost:${process.env.APP_PORT}`
      : process.env.APP_URL,
};

module.exports = env;
