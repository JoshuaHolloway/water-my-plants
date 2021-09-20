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
    return next(error);
    // -return value not actually used,
    //  but don't want to execute any
    //  code below this where functino is
    //  called (specifically, don't want to
    //  send multiple responses, as a
    //  response is sent in the error-handling
    //  middleware that next(error)
    //  goes to in app.js).
  }
};

// ==============================================

module.exports = check_errors;
