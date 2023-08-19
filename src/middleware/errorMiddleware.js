const errorMiddleware = (err, req, res) => {
  const statusCode = res.statusCode != 200 ? res.statusCode : 500;
  console.log('STATUS CODE', statusCode);

  if (err) {
    return res.status(statusCode).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = errorMiddleware;
