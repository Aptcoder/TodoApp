class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = function (res, err) {
  res.status(err.statusCode).send({
    status: 'error',
    message: err.message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
