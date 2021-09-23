// NOTE: plants collection must be created in advance on in the DB
//       due to transactions / sessions not being able to
//       create a collection on-the-fly.

const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const check_errors = require('../checkErrors');

const Plant = require('../../models/plant');
const User = require('../../models/user');
// const user = require('../../models/user');

// ==============================================

// Read 1 (R in CRUD)
const { getPlantById } = require('./getPlantById');

// ==============================================

// Read 2 (R in CRUD)
const { getPlantsByUserId } = require('./getPlantsByUserId');

// ==============================================
// Create (C in CRUD)
const { createPlant } = require('./createPlant');

// ==============================================

const { updatePlant } = require('./updatePlant');

// ==============================================

const { deletePlant } = require('./deletePlant');
// ==============================================

// module.exports;
exports.getPlantById = getPlantById;
exports.getPlantsByUserId = getPlantsByUserId;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;
