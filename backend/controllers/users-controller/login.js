const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const {
  invalid_credentials_error,
  server_error,
  err_f,
} = require('../errorMessages');

const { create_jwt } = require('./jwt');

// ==============================================

// Read (R in CRUD)
const login_old = async (req, res, next) => {
  const { email, password } = req.body;

  // --------------------------------------------

  // const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    server_error(next);
  }

  console.log('login.js -- existingUser: ', existingUser);

  // --------------------------------------------

  if (!existingUser) {
    invalid_credentials_error(next);
  }

  // --------------------------------------------

  // -User found in DB
  // -Check password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      password /* un-hashed password (to be hashed by .compare()) */,
      existingUser.password /* Hashed Password */
    );
  } catch (err) {
    // -This is a server side error
    // -An error will not be thrown if we have invalid credentials.
    server_error(next);
  }

  // --------------------------------------------

  // -If password does not match users password in DB
  if (!isValidPassword) {
    invalid_credentials_error(next);
  }

  // --------------------------------------------

  // -User provided correct credentials!
  // -Log them in (generate JWT)

  const token = create_jwt(existingUser, next);
  // --------------------------------------------

  console.log('(backend) logged in!');

  const user_obj = existingUser.toObject({ getters: true });

  console.log('user_obj: ', user_obj);

  // res.json({
  //   message: 'Logged in! (sent from backend)',
  //   user: existingUser.toObject({ getters: true }),
  // });
  res.json({
    // userId: existingUser.id,
    userId: user_obj.id,
    email: user_obj.email,
    token: token,
  });
};

// ==============================================

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

// ==============================================

exports.login = login;
