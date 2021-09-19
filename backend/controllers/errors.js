const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

// ==============================================
const check_errors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('errors: ', errors);

    // !errors.isEmpty => we DO have errors!
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
};

// ==============================================

module.exports = check_errors;
