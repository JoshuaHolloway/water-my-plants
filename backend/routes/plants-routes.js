const express = require('express');

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
router.post('/', plantsControllers.createPlant);

// ==============================================

// (PATCH) /api/plants/p1
router.patch('/:pid', plantsControllers.updatePlant);

// ==============================================

// (DELETE) /api/plants/p1
router.delete('/:pid', plantsControllers.deletePlant);

// ==============================================

module.exports = router;
