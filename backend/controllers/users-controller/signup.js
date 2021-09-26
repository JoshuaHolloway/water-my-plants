const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const check_errors = require('../checkErrors');
const { server_error, err_f } = require('../errorMessages');

// ==============================================

// Create (C in CRUD)
const signup = async (req, res, next) => {
  // --------------------------------------------
  check_errors(req, next);
  // --------------------------------------------

  const { name, email, password } = req.body;

  // const hasUser = DUMMY_USERS.find((u) => u.email === email);
  // if (hasUser) {
  //   throw new HttpError('Could not create user, email already exists.', 422);
  // }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    server_error(next);
  }

  if (existingUser) {
    err_f('User exists already, please login instead.', 422, next);
  }

  // --------------------------------------------

  let hashedPassword;
  try {
    const salts = 12;
    hashedPassword = await bcrypt.hash(password, salts);
  } catch (err) {
    server_error(next);
  }
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
    // image: '',
    password: hashedPassword,
    plants: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    server_error(next);
  }

  // --------------------------------------------

  let token;
  const payload = { userId: createdUser.id, email: createdUser.email }; // data to be encoded in token
  const privateKey = process.env.JWT_KEY;
  const tokenConfig = { expiresIn: '1h' };
  try {
    token = jwt.sign(payload, privateKey, tokenConfig);
  } catch (err) {
    server_error(next);
  }
  // --------------------------------------------

  // res.status(201).json({ user: createdUser });
  // res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });

  console.log(
    'User created (check DB) and token sent back to client (check client console for response)'
  );
};

// ==============================================

exports.signup = signup;
