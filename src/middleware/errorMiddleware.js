const { APP_ENV } = require('../../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode != 200 ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: APP_ENV == 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
