const err_f = (err_str, status_code) => {
  const error = new HttpError(err_str, status_code);
  return next(error);
};

// ==============================================

const invalid_credentials_error = (status_code = 401) =>
  err_f('Could not identify user, credentials seem to be wrong.', status_code);

// ==============================================

const server_error = (error_str = 'server error', status_code = 500) =>
  err_f(error_str, status_code);

// ==============================================

exports.invalid_credentials_error = invalid_credentials_error;
exports.server_error = server_error;
exports.err_f = err_f;
