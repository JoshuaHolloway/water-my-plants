const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

// ==============================================

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next(); // Allow OPTIONS request to continue
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');

    // -Add data to the req. object to be
    //  used later on in the middleware chain.
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};

// ==============================================
