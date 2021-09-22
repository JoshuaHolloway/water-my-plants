const User = require('../../models/user');
const { err_f } = require('../errorMessages');

// ==============================================

// Read (R in CRUD)
const getUsers = async (req, res, next) => {
  let users;
  try {
    // -Return only email and name (exclude password)
    users = await User.find({}, '-password');
  } catch (err) {
    err_f('Fetching users failed, please try again later.', 500);
  }
  // res.status(200).json({ users: DUMMY_USERS });
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// ==============================================

exports.getUsers = getUsers;
