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

  // -Get data encoded in headers for the h2o-freq:
  const repeat_every_x_mins = Number(req.headers.repeat_every_x_mins);
  console.log('repeat_every_x_mins: ', repeat_every_x_mins);

  // Send 201 - resource created
  res.status(201).json({});

  const set_push = async (push_title) => {
    // Create payload
    const payload = JSON.stringify({ title: push_title });
    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.error('JOSH\nJOSH\nJOSH\nJOSH: ', err));
  };
  // set_push('Initial Push');

  const now = new Date();
  console.log('time is currently: ', now.getHours(), ' : ', now.getMinutes());
  // const hours = push_reg_hr;
  // const minutes = push_reg_min;
  // const seconds = 0;
  // const ms = 0;
  // let millisTill_specified_time =
  //   new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate(),
  //     hours,
  //     minutes,
  //     seconds,
  //     ms
  //   ) - now;
  // if (millisTill_specified_time < 0) {
  //   millisTill_specified_time += 86400000; // it's after 10am, try 10am tomorrow.
  // }
  // setTimeout(function () {
  //   console.log("It's time!!!");
  //   set_push('Timed Push');
  // }, millisTill_specified_time);

  const milliseconds = repeat_every_x_mins * 60 * 1e3;

  setInterval(() => {
    console.log("It's time!!!");
    set_push('Timed Push');
  }, milliseconds);

  let count = 0;
  setInterval(() => {
    const t = new Date();
    count = (count + 1) % 60;
    console.log(
      `${t.getHours()} : ${t.getMinutes()} : ${t.getSeconds()} \t countdown: ${
        repeat_every_x_mins * 60 - count
      }`
    );
  }, 1e3);
});

// ==============================================

module.exports = router;
