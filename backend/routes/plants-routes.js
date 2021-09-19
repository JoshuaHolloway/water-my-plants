const express = require('express');
const { check } = require('express-validator');

const plantsControllers = require('../controllers/plants-controller');
const router = express.Router();

// ==============================================

// (GET)  /api/plants/p1
router.get('/:pid', plantsControllers.getPlantById);

// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
router.get('/user/:uid', plantsControllers.getPlantsByUserId);

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
    check('h2oFrequency').not().isEmpty(),
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
