const parseValidationErrors = (errors) => {
    const details = errors.map((error) => {
        return {
            path: error.path[0],
            message: error.message,
            type: error.type,
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
