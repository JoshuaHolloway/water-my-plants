const express = require('express');
const bodyParser = require('body-parser');

const plantsRoutes = require('./routes/plants-routes');

const app = express();

// -Add the routes (from plants-router.js)
//  to middleware in app.js
app.use('/api/plants', plantsRoutes);
// -Using the optional first string arguement here
//  makes express only forward requests to plantsRoutes
//  middleware if their path starts with /api/places

// -Error handling middleware
// -Four args => special middleware function
//               used as error middleware function.
// -The callback function will run if any middleware
//  in front of this yields an error.
app.use((error, req, res, next) => {
  // -Check to see if response has already
  //  been sent.
  // -If that is the case, then we want to
  //  return next, and forward the error.
  // -In other words, we won't send a response
  //  on our own, because somehow we
  //  already have sent a response.
  if (res.headerSent) {
    return next(error);
  }

  // -Set status code on response
  // -If code property on error object passed in
  //  then use it,
  //  else, set 500 status.
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

app.listen(5e3, () => console.log('localhost:5000'));
