const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

// ==============================================
const check_errors = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(
      '~~~~~ check_errors (errors.js) if( !errors.isEmpty() ) { ... } ~~~~~~'
    );

    console.log('errors: ', errors);

    // !errors.isEmpty => we DO have errors!
    // throw new HttpError('Invalid inputs passed, please check your data.', 422);

    // -throw only works in synchronous code!
    const error = new HttpError(
      'Invalid inputs passed, please check your data.',
      422
    );
    next(error);
  }
};

// ==============================================

module.exports = check_errors;
