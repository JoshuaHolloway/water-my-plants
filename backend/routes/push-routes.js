const express = require('express');
const webpush = require('web-push');

const router = express.Router();

// ==============================================

// [GET] /api/push/
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

module.exports = router;
