const express = require('express');
const { check } = require('express-validator');
const webpush = require('web-push');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const plantsControllers = require('../controllers/plants-controller');

// ==============================================

// [GET] /api/plants/
router.post('/subscribe-to-push', async (req, res, next) => {
  console.log('POST to /  (DEBUG)');
  // if (req.method === 'OPTIONS') {
  //   return next();
  // }

  // Subscribe Route
  // app.post('/subscribe', (req, res) => {
  // console.log('/subscribe');

  // Get pushSubscription object
  const subscription = req.body;
  console.log('subscription: ', subscription);

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error('JOSH\nJOSH\nJOSH\nJOSH: ', err));
});

// -register middleware for protected routes below
router.use(checkAuth);
// -All routes below are protected and
//  can only be reached with a valid token

// ==============================================
// == BELOW ARE PROTECTED ROUTES
// == Hackers: Please do NOT hack below routes :)
// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
//  TODO: Currently works if ANY user is logged in.
//        -Change this in the following ways:
//          --Move to protected routes (place below checkAuth middleware)
//          --Extract user-id from req.userData.userId
//            which is set in the checkAuth middleware.
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

// (GET)  /api/plants/p1
// -Get specific plant (based on plant-id)
router.get('/:pid', plantsControllers.getPlantById);
// -Currently only using in UpdatePlant.js in frontend

// ==============================================

// (DELETE) /api/plants/p1
router.delete('/:pid', plantsControllers.deletePlant);

// ==============================================

module.exports = router;
