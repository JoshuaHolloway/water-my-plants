const { server_error } = require('../errorMessages');

// ==============================================

const create_jwt = (user, next) => {
  let token;
  const payload = { userId: user.id, email: user.email }; // data to be encoded in token
  const privateKey = 'josh-private-key-shhhhh!!!';
  const tokenConfig = { expiresIn: '1h' };
  try {
    token = jwt.sign(payload, privateKey, tokenConfig);
  } catch (err) {
    server_error(next);
  }
  return token;
};

// ==============================================

exports.create_jwt = create_jwt;
