const express = require('express');
const { check } = require('express-validator');
const webpush = require('web-push');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const plantsControllers = require('../controllers/plants-controller');

// ==============================================

// [GET] /api/plants/
router.post('/', async (req, res, next) => {
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

  const set_push = async (push_title) => {
    // Create payload
    const payload = JSON.stringify({ title: push_title });
    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.error('JOSH\nJOSH\nJOSH\nJOSH: ', err));
  };
  set_push('Initial Push');

  const now = new Date();
  console.log('time is currently: ', now.getHours(), ' : ', now.getMinutes());
  const hours = 9;
  const minutes = 25;
  const seconds = 30;
  const ms = 0;
  let millisTill_specified_time =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds,
      ms
    ) - now;
  if (millisTill_specified_time < 0) {
    millisTill_specified_time += 86400000; // it's after 10am, try 10am tomorrow.
  }
  setTimeout(function () {
    console.log("It's time!!!");
    set_push('Timed Push');
  }, millisTill_specified_time);

  setInterval(() => {
    const t = new Date();
    console.log(`${t.getHours()} : ${t.getMinutes()} : ${t.getSeconds()}`);
  }, 1e3);
});

// ==============================================

// -register middleware for protected routes below
router.use(checkAuth);
// -All routes below are protected and
//  can only be reached with a valid token

// ==============================================
// == BELOW ARE PROTECTED ROUTES
// == Hackers: Please do NOT hack code below :)
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
  '/add',
  [
    check('nickname').not().isEmpty(),
    check('species').isLength({ min: 1 }),
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

// (GET)  /api/plants/p1
// -Get specific plant (based on plant-id)
router.get('/:pid', plantsControllers.getPlantById);
// -Currently only using in UpdatePlant.js in frontend

// ==============================================

// (DELETE) /api/plants/p1
router.delete('/:pid', plantsControllers.deletePlant);

// ==============================================

module.exports = router;
