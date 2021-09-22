// ==============================================

// Read (R in CRUD)
const { getUsers } = require('./getUsers');

// ==============================================

// Create (C in CRUD)
const { signup } = require('./signup');

// ==============================================

// Read (R in CRUD)
const { login } = require('./login');

// ==============================================

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
