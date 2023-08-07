const errorMiddleware = (err, req, res, next) => {
    if (err) {
        return res.json({
            message: err.message,
            stack: err.stack,
        });
    }
};

module.exports = errorMiddleware;
