const parseValidationErrors = (errors) => {
  const details = {};
  errors.forEach((error) => {
    details[error.path[0]] = {
      path: error.path[0],
      message: error.message,
    };
  });

  const parsedError = {
    message: 'Validation Error',
    code: '422',
    details,
  };

  return parsedError;
};

module.exports = parseValidationErrors;
