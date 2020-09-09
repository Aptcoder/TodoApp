const { validationResult } = require('express-validator');
const { User } = require('../database/models');
const { ErrorHandler } = require('../utils/error');
const { responseHandler } = require('../utils/response');
const hashPassword = require('../utils/hash-password');

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
      throw new ErrorHandler(404, 'No user foud');
    }
    return responseHandler(res, 200, 'Users', { users });
  } catch (err) {
    return next(err);
  }
};

// register a user
const registerUser = async (req, res, next) => {
  // check if express vaidator caught any errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    const message = err.map((error) => `${error.msg} in ${error.param}`);
    return next(new ErrorHandler(400, message));
  }
  const { name, email, password } = req.body;
  try {
    const user = await User.build({
      name,
      email
    });

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();
    return responseHandler(res, 201, 'User created', { user });
  } catch (err) {
    return next(err);
  }
};
module.exports = { getAllUsers, registerUser };
