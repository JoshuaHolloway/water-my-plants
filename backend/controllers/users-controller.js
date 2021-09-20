const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/user');
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

// Read (R in CRUD)
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  // res.status(200).json({ users: DUMMY_USERS });
};

// ==============================================

// Create (C in CRUD)
const signup = async (req, res, next) => {
  // --------------------------------------------
  check_errors(req, next);
  // --------------------------------------------

  const { name, email, password, plants } = req.body;

  // const hasUser = DUMMY_USERS.find((u) => u.email === email);
  // if (hasUser) {
  //   throw new HttpError('Could not create user, email already exists.', 422);
  // }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  // --------------------------------------------

  // const createdUser = {
  //   id: uuidv4(),
  //   name, // name: name
  //   email,
  //   password,
  // };
  // DUMMY_USERS.push(createdUser);
  const createdUser = new User({
    name,
    email,
    // image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
    password /* NOT ENCRYPTED! */,
    plants,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  // --------------------------------------------

  // res.status(201).json({ user: createdUser });
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

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
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  // --------------------------------------------

  if (!existingUser || existingUser.password !== password) {
    // throw new HttpError(
    //   'Could not identify user, credentials seem to be wrong.',
    //   401
    // );
    const error = new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      401
    );
    return next(error);
  }

  console.log('(backend) logged in!');
  res.json({ message: 'Logged in! (sent from backend)' });
};

// ==============================================

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
