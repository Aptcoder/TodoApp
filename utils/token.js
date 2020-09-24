const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const generateToken = function (user) {
  const payload = {
    email: user.email
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, {
      expiresIn: '3d'
    }, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyToken };
