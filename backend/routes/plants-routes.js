const express = require('express');

const plantsControllers = require('../controllers/plants-controller');
const router = express.Router();

// ==============================================

// /api/plants/
router.get('/', (req, res) => {
  console.log('GET request in places');
  res.send({ message: 'Do epic shit!' });
});

// ==============================================

// /api/plants/p1
router.get('/:pid', plantsControllers.getPlantById);

// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
router.get('/user/:uid', plantsControllers.getPlantByUserId);

// ==============================================

module.exports = router;
