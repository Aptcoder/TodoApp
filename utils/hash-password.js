const bcrypt = require('bcrypt');

module.exports = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return reject(err);
    }
    return resolve(hash);
  });
});
