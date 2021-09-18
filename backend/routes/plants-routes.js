const express = require('express');

const router = express.Router();

// ==============================================

const DUMMY_PLANTS = [
  {
    id: 'p1', // o  id
    nickname: '', // o  Nickname
    species: 'species A', // o  Species
    h20Frequency: 2, // o  h20Frequency [units???]
    image: '', // o  Image.
    creator: 'u1',
  },
];

// ==============================================

// /api/plants/
router.get('/', (req, res) => {
  console.log('GET request in places');
  res.send({ message: 'Do epic shit!' });
});

// ==============================================

// /api/plants/p1
router.get('/:pid', (req, res) => {
  const plantId = req.params.pid; // { pid: 'p1' }

  const plant = DUMMY_PLANTS.find((p) => p.id === plantId);

  console.log('GET request in places');
  res.json({ plant });
});

// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
router.get('/user/:uid', (req, res) => {
  const userId = req.params.uid;

  const plant = DUMMY_PLANTS.find((p) => p.creator === userId);

  res.json({ plant });
});

// ==============================================

module.exports = router;
