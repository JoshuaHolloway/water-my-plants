const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

// ==============================================

let DUMMY_PLANTS = [
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

const getPlantById = (req, res) => {
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

    // const error = new Error(
    //   'Could not find a plant for the provided PLANT id!  (string arg to Error object constructor in .get(/:pid))'
    // );
    // error.code = 404;
    // throw error;

    throw new HttpError(
      'Could not find a plant for the provided PLANT id!  (string arg to Error object constructor in .get(/:pid))',
      404
    );
  }
  res.json({ plant });
};

// ==============================================

const getPlantByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const plant = DUMMY_PLANTS.find((p) => p.creator === userId);
  if (!plant) {
    // return res
    //   .status(404)
    //   .json({ message: 'could not find a plant for the provided user id' });
    // const error = new Error(
    //   'Could not find a plant for the provided USER id!  (string arg to Error object constructor in .get(/user/:uid)'
    // );
    // error.code = 404;
    // return next(error);
    // -return to avoid sending response outside of this if block.
    // -Returned value not used though.

    return next(
      new HttpError(
        'Could not find a plant for the provided USER id!  (string arg to Error object constructor in .get(/user/:uid)',
        404
      )
    );
  }
  res.json({ plant });
};

// ==============================================

const createPlant = (req, res, next) => {
  // -This works because of the body-parser
  const { /*id, */ nickname, species, h2ofrequency, image, creator } = req.body;

  const createdPlant = {
    id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    nickname,
    species,
    h2ofrequency,
    image,
    creator,
  };

  DUMMY_PLANTS.push(createdPlant);

  res.status(201).json({ plant: createdPlant }); // created new resource
};

// ==============================================

const updatePlant = (req, res, next) => {
  const { /*id, */ nickname, species /*, h2ofrequency, image, creator */ } =
    req.body;

  const plantId = req.params.pid;

  // const updatePlant = DUMMY_PLANTS.find(p => p.id === plantId);

  // -update in an immutable way
  // (Bad Practice [mutable]): updatePlace.nickname = nickname;

  // -{ ...x} creates a new object and copies all key-value pairs
  //  of the old object into the new object.
  const updatedPlant = { ...DUMMY_PLANTS.find((p) => p.id === plantId) };
  const plantIndex = DUMMY_PLANTS.findIndex((p) => p.id === plantId);
  updatedPlant.nickname = nickname;
  updatedPlant.species = species;

  DUMMY_PLANTS[plantIndex] = updatedPlant;

  // -200: Success without creating a new resource
  res.status(200).json({ plant: updatedPlant });
};

// ==============================================

const deletePlant = (req, res, next) => {
  const plantId = req.params.pid;
  console.log(`[DELETE] /api/plants/${plantId}`);

  // -overwrite original array with new array (immutably)
  DUMMY_PLANTS = DUMMY_PLANTS.filter((p) => p.id === plantId);
  res.status(200).json({ message: 'deleted place.' });
};

// ==============================================

// module.exports;
exports.getPlantById = getPlantById;
exports.getPlantByUserId = getPlantByUserId;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;
