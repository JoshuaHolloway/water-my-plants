const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller/users-controller');
const router = express.Router();

// ==============================================

// (GET)  /api/plants/
router.get('/', usersControllers.getUsers);

// ==============================================

// (POST)  /api/plants
router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersControllers.signup
);

// ==============================================

// (POST)  /api/plants
router.post('/login', usersControllers.login);

// ==============================================

module.exports = router;
