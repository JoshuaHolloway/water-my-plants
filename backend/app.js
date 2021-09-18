const express = require('express');
const bodyParser = require('body-parser');

const plantsRoutes = require('./routes/plants-routes');

const app = express();

// -Add the routes (from plants-router.js)
//  to middleware in app.js
app.use('/api/places', plantsRoutes);
// -Using the optional first string arguement here
//  makes express only forward requests to plantsRoutes
//  middleware if their path starts with /api/places

app.listen(5e3, () => console.log('localhost:5000'));
