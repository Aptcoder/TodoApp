const { validationResult } = require('express-validator');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../database/models');
const { ErrorHandler } = require('../utils/error');
const { responseHandler } = require('../utils/response');
const hashPassword = require('../utils/hash-password');
const { generateToken } = require('../utils/token');

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    if (!users) {
      throw new ErrorHandler(404, 'No user foud');
    }
    return responseHandler(res, 200, 'Users', { users });
  } catch (err) {
    return next(err);
  }
};

// register a user
const createUser = async (req, res, next) => {
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
    const token = await generateToken(user);
    res.set('x-auth', token);
    return responseHandler(res, 201, 'User created', { user: _.omit(user, ['password']) });
  } catch (err) {
    return next(err);
  }
};

// login user to the database
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    const message = err.map((error) => `${error.msg} in ${error.param}`);
    return next(new ErrorHandler(400, message));
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorHandler(404, 'User with email not found');
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      throw new ErrorHandler(401, 'Wrong password');
    }
    const token = await generateToken(user);
    res.set('x-auth', token);
    return responseHandler(res, 200, 'Login successful');
  } catch (err) {
    console.log('error', err);
    return next(err);
  }
};
module.exports = { getAllUsers, createUser, loginUser };
