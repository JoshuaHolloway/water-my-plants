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
