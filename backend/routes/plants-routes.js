const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const plantsControllers = require('../controllers/plants-controller');

// ==============================================

// (GET)  /api/plants/p1
// -Get specific plant (based on plant-id)
router.get('/:pid', plantsControllers.getPlantById);

// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
router.get('/user/:uid', plantsControllers.getPlantsByUserId);

// ==============================================

// -register middleware for protected routes below
router.use(checkAuth);
// -All routes below are protected and
//  can only be reached with a valid token

// ==============================================

// (POST)  /api/plants
// -Two middlewares added (check, createPlant)
// -check() takes name of the field in the request
//  body that we want to validate.
// -check() runs before out controller runs.
// -
router.post(
  '/',
  [
    check('nickname').not().isEmpty(),
    check('species').isLength({ min: 5 }),
    // check('h2oFrequency').not().isEmpty(),
  ],
  plantsControllers.createPlant
);

// ==============================================

// (PATCH) /api/plants/p1
router.patch(
  '/:pid',
  [check('nickname').not().isEmpty(), check('species').isLength({ min: 5 })],
  plantsControllers.updatePlant
);

// ==============================================

// (DELETE) /api/plants/p1
router.delete('/:pid', plantsControllers.deletePlant);

// ==============================================

module.exports = router;
