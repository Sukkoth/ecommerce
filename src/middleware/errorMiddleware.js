const { APP_ENV } = require('../../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode || 500;

  res.status(statusCode);

  const errorMessagesForProduction = {
    404: 'Not Found',
    500: 'Internal Server Error',
  };

  res.json({
    message:
      APP_ENV === 'DEV' ? err.message : errorMessagesForProduction[statusCode],
    stack: APP_ENV == 'production' ? null : err.stack,
    code: statusCode,
  });
};

module.exports = errorHandler;
