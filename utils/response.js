/**
 * This is to be used for successful responses
 * @param {Object} res - express response object
 * @param {number} statusCode - The response code
 * @param {string} message - The response message
 * @param {Object} data - The requested data if any
 *
 * @example
 *  responseHandler(res,200,"User data found.", { user: {name: 'tobi'}})
 */

exports.responseHandler = (res, statusCode = 200, message, data = {}) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};
