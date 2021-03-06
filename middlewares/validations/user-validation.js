const { body } = require('express-validator');

const userValidationRules = () => [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

module.exports = userValidationRules;
