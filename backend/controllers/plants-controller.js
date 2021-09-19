const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const check_errors = require('./errors');

const Plant = require('../models/plant');

// ==============================================

let DUMMY_PLANTS = [
  {
    id: 'p1', // o  id
    nickname: 'plant A', // o  Nickname
    species: 'species A', // o  Species
    h2oFrequency: 1, // o  h2oFrequency [units???]
    image: '', // o  Image.
    creator: 'u1',
  },
  {
    id: 'p2', // o  id
    nickname: 'plant B', // o  Nickname
    species: 'species B', // o  Species
    h2oFrequency: 2, // o  h2oFrequency [units???]
    image: '', // o  Image.
    creator: 'u1',
  },
];

// ==============================================

// Read 1 (R in CRUD)
const getPlantById = async (req, res) => {
  console.log('/api/plants/:pid');

  const plantId = req.params.pid; // { pid: 'p1' }

  // --------------------------------------------

  //const plant = DUMMY_PLANTS.find((p) => p.id === plantId);
  let plant;
  try {
    // .findById is a static method (incoked on the constructor function)
    plant = await Plant.findById(plantId); // findById() does not return a Promise here, .exec() returns a real Promise
  } catch (err) {
    // -Possible error 1:
    //  --This error is thrown if the GET request has some problem.

    const error = new HttpError(
      'Something went wrong, could not find a plant!',
      500
    );
    return next(error);
  }

  // --------------------------------------------

  if (!plant) {
    // -Possible error 2:
    //  --This error is thrown if we did not find the plantId in the DB

    // -did not find resource
    // return res
    //   .status(404)
    //   .json({ message: 'could not find a plant for the provided id!' });

    // -throwing error here will jump code execution
    //  to the error handling middleware in app.js.
    // throw new Error();
    // -Calling next() with Error passed as arg
    //  also does same thing (with one difference:
    //  you cannot throw errors in async code).

    // const error = new Error(
    //   'Could not find a plant for the provided PLANT id!  (string arg to Error object constructor in .get(/:pid))'
    // );
    // error.code = 404;
    // throw error;

    const error = HttpError(
      'Could not find a plant for the provided PLANT id!  (string arg to Error object constructor in .get(/:pid))',
      404
    );
    return next(error);
    // -cannot throw error due to this being async code.
    // -return value is not used, but we don't want to
    //  run the code below to send a response
    //  since the response will be sent in the
    //  error-handling middleware.
  }

  // --------------------------------------------

  // res.json({ plant });
  res.json({ plant: plant.toObject({ getters: true }) });
  // -plant Object is a specific mongoose object
  //  (with mongoose related methods, etc.)
  // -the object will be easier to use if we
  //  first convert it to a normal JS-object
  //  before sending it in the response.
  // -{ getters: true }  get rid of the _id
  //  because mongoose adds an id getter
  //  to every document that returns the id
  //  as a string.
  // -{ getters: true } tells mongoose to add
  //  a .id property to the created object.
};

// ==============================================

// Read 2 (R in CRUD)
const getPlantsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const plants = DUMMY_PLANTS.filter((p) => p.creator === userId);
  if (!plants || plants.length === 0) {
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
        'Could not find plants for the provided USER id!  (string arg to Error object constructor in .get(/user/:uid)',
        404
      )
    );
  }
  res.json({ plants });
};

// ==============================================
// Create (C in CRUD)
const createPlant = async (req, res, next) => {
  console.log('[POST]   /api/plants/');

  // --------------------------------------------
  check_errors(req);
  // --------------------------------------------

  // -This works because of the body-parser
  const { /*id, */ nickname, species, h2ofrequency, image, creator } = req.body;

  // --------------------------------------------

  // const createdPlant = {
  //   id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  //   nickname,
  //   species,
  //   h2ofrequency,
  //   image,
  //   creator,
  // };
  const createdPlant = new Plant({
    nickname,
    species,
    h2ofrequency,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator,
  });

  console.log('createdPlant: ', createdPlant);

  // --------------------------------------------

  // DUMMY_PLANTS.push(createdPlant);
  try {
    console.log('createPlant, createdPlant try{}');
    const x = await createdPlant.save(); // save() creates a unique id
  } catch (err) {
    console.log('.catch(err):   err: ', err);
    const error = new HttpError('Created plant failed, please try again.', 500);
    return next(error);
  }

  console.log('createdPlant try{} succeeded (check DB)');

  // --------------------------------------------

  res.status(201).json({ plant: createdPlant }); // created new resource
};

// ==============================================

const updatePlant = (req, res, next) => {
  // --------------------------------------------
  check_errors(req);
  // --------------------------------------------

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

  // -Check to ensure the place we are trying
  //  to delete actually exists before
  //  deleting it.
  if (!DUMMY_PLANTS.find((p) => p.id === plantId)) {
    throw new HttpError('Could not find a place for that id', 404);
  }

  console.log('DUMMY_PLANTS (before deletion): ', DUMMY_PLANTS);

  // -overwrite original array with new array (immutably)
  DUMMY_PLANTS = DUMMY_PLANTS.filter((p) => p.id !== plantId);

  console.log('DUMMY_PLANTS (after deletion): ', DUMMY_PLANTS);

  res.status(200).json({ message: 'deleted place.' });
};

// ==============================================

// module.exports;
exports.getPlantById = getPlantById;
exports.getPlantsByUserId = getPlantsByUserId;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;
