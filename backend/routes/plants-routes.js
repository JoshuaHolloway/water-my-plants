const express = require('express');

const router = express.Router();

// ==============================================

// /api/places/
router.get('/', (req, res) => {
  console.log('GET request in places');
  res.send({ message: 'Do epic shit!' });
});

// ==============================================

module.exports = router;
