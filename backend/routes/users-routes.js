const express = require('express');

const usersControllers = require('../controllers/users-controller');
const router = express.Router();

// ==============================================

// (GET)  /api/plants/
router.get('/', usersControllers.getUsers);

// ==============================================

// (POST)  /api/plants
router.post('/signup', usersControllers.signup);

// ==============================================

// (POST)  /api/plants
router.post('/login', usersControllers.login);

// ==============================================

module.exports = router;
