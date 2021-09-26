const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const webpush = require('web-push');

const plantsRoutes = require('./routes/plants-routes');
const usersRoutes = require('./routes/users-routes');
const pushRoutes = require('./routes/push-routes');

// const HttpError = require('./models/http-error');

const app = express();

// ==============================================

// Set static path (for PUSH notifications)
// app.use(express.static(path.join(__dirname, 'client')));

// -Parse the incoming request body
// -We use the parsed body in the routes below.
app.use(bodyParser.json());
// -This will parse the incoming request body,
//  and extract any JSON data,
//  convert it to regular JS-data-structuers (objects and arrays)
//  and automatically call next() to reach the
//  following middleware that contains our custom routes.

// ==============================================

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// -initial JS/CSS files and index.html file, but not for the routes like auth
app.use(express.static(path.join('public')));

// ==============================================

// -CORS headers not required in production deployment
// -Only required for development while utilizing
//  a seperate server for frontend and backend.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Push_reg_hr, Push_reg_min'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// ================================================
// =PUSH NOTIFICATIONS (route set in plantsRoures)=
// ================================================

const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// ==============================================

// -Add the routes to middleware
app.use('/api/push', pushRoutes);
app.use('/api/plants', plantsRoutes);
app.use('/api/users', usersRoutes);

// ==============================================

// -Add public folder (which contains the built SPA)
// -The 404 middleware (below this section)
//  is no longer needed after adding
//  this static code addition.
// -Because, we want all requests going
//  to *any* URL to be served statically.
// -i.e., any request that reaches the backend
//        and was not handled by any route handlers
//        by this point, will be served the static
//        assets from public folder (the SPA inside index.html)
// app.use(express.static(path.join('public')));
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// ==============================================

// -Below middleware is executed only if
//  one of the previous routes did not
//  send a response.
// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route - 404', 404);
//   throw error; // throw to default error handling midddleware
// });

// ==============================================

// -Using the optional first string arguement here
//  makes express only forward requests to plantsRoutes
//  middleware if their path starts with /api/plant

// -Error handling middleware
// -Four args => special middleware function
//               used as error middleware function.
// -The callback function will run if any middleware
//  in front of this yields an error.
app.use((error, req, res, next) => {
  console.log('error handling middleware!');
  console.log('error handling middleware!');
  console.log('error.message: ', error.message);

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// ==============================================

// -Step 1: Establish connection to database
// -Step 2: (if step 1 is successful) Start backend server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.almxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(process.env.PORT || 5e3);
  })
  .catch(() => {
    console.log('Connection to DB failed!');
  });
// returns a promise,

// ==============================================
