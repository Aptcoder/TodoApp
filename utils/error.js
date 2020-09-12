// const { listen } = require("../app");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (res, err) => {
  let statusCode = err.statusCode || 500;
  const message = err.message || 'Something unexpected went wrong.';
  if (err.sql) {
    statusCode = 400;
    // message = err.detail;
  }
  res.status(statusCode).send({
    status: 'error',
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
