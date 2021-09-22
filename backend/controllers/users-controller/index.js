const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const check_errors = require('../checkErrors');
const {
  invalid_credentials_error,
  server_error,
  err_f,
} = require('../errorMessages');

// ==============================================

// Read (R in CRUD)
const { getUsers } = require('./getUsers');

// ==============================================

// Create (C in CRUD)
const { signup } = require('./signup');

// ==============================================

// Read (R in CRUD)
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // --------------------------------------------

  // const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    server_error();
  }

  // --------------------------------------------

  if (!existingUser) {
    invalid_credentials_error();
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
    server_error();
  }

  // --------------------------------------------

  // -If password does not match users password in DB
  if (!isValidPassword) {
    invalid_credentials_error();
  }

  // --------------------------------------------

  // -User provided correct credentials!
  // -Log them in (generate JWT)

  let token;
  const payload = { userId: createdUser.id, email: createdUser.email }; // data to be encoded in token
  const privateKey = 'josh-private-key-shhhhh!!!';
  const tokenConfig = { expiresIn: '1h' };
  try {
    token = jwt.sign(payload, privateKey, tokenConfig);
  } catch (err) {
    server_error();
  }

  // --------------------------------------------

  console.log('(backend) logged in!');

  // res.json({
  //   message: 'Logged in! (sent from backend)',
  //   user: existingUser.toObject({ getters: true }),
  // });
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

// ==============================================

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
