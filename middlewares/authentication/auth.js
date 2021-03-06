const { ErrorHandler } = require('../../utils/error');
const { User } = require('../../database/models');
const { verifyToken } = require('../../utils/token');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth');

  if (!token) {
    return res.status(401).send({
      status: 'error',
      message: 'Not allowed. login first'
    });
  }

  try {
    const decoded = await verifyToken(token);
    console.log("decoded",decoded)
    if (!decoded) {
      throw new ErrorHandler(500, 'Something unexpected went wrong');
    }

    const user = await User.findOne({ where: { email: decoded.email }  });

    if (!user) {
      throw new ErrorHandler(401, 'Not allowed. login first');
    }
    console.log("user",user)
    req.user = user;
    return next();
  } catch (e) {
    return next(new ErrorHandler(401, 'Not allowed. login first'));
  }
};
