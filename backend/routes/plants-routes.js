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
  console.log('/api/plants/:pid');

  const plantId = req.params.pid; // { pid: 'p1' }

  const plant = DUMMY_PLANTS.find((p) => p.id === plantId);

  if (!plant) {
    // -did not find resource
    // return res
    //   .status(404)
    //   .json({ message: 'could not find a plant for the provided id!' });

    // -throwing error here will jump code execution
    //  to the error handling middleware in app.js.
    // throw new Error();
    // -Calling next() with Error passed as arg
    //  also does same thing (with one difference:
    //  you cannot throw errors in async code [this is synchronous]).
    // next(error);

    const error = new Error(
      'Could not find a plant for the provided PLANT id!  (string arg to Error object constructor in .get(/:pid))'
    );
    error.code = 404;
    throw error;
  }
  res.json({ plant });
});

// ==============================================

// /api/plants/user/u1
// o  (GET) /api/plants
// 	§ Retrieve list of all plants for currently logged in user
router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const plant = DUMMY_PLANTS.find((p) => p.creator === userId);
  if (!plant) {
    // return res
    //   .status(404)
    //   .json({ message: 'could not find a plant for the provided user id' });
    const error = new Error(
      'Could not find a plant for the provided USER id!  (string arg to Error object constructor in .get(/user/:uid)'
    );
    error.code = 404;
    // throw error;
    return next(error);
    // -return to avoid sending response outside of this if block.
    // -Returned value not used though.
  }
  res.json({ plant });
});

// ==============================================

module.exports = router;
