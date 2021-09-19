const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const check_errors = require('./errors');

// ==============================================

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Josh Holloway',
    email: 'test@test.com',
    password: 'testers',
  },
  {
    id: 'u2',
    name: 'Steve Jobs',
    email: 'steve@apple.com',
    password: 'lisa',
  },
];

// ==============================================

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

// ==============================================

const signup = (req, res, next) => {
  // --------------------------------------------
  check_errors(req);
  // --------------------------------------------

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: uuidv4(),
    name, // name: name
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

// ==============================================

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      401
    );
  }

  res.json({ message: 'Logged in!' });
};

// ==============================================

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
