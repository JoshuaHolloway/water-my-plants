// NOTE: plants collection must be created in advance on in the DB
//       due to transactions / sessions not being able to
//       create a collection on-the-fly.

const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const check_errors = require('../checkErrors');

const Plant = require('../../models/plant');
const User = require('../../models/user');
const user = require('../../models/user');

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
const getPlantsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // --------------------------------------------
  // const plants = DUMMY_PLANTS.filter((p) => p.creator === userId);
  let plants;
  try {
    // -.find() returns all occurences of elements that match the query.
    // -.find() in mongodb returns a cursor that we can iterate through.
    // -.find() in mongoose returns an actual array.
    plants = await Plant.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching plants failed, please try again later',
      500
    );
    return next(error);
  }
  // --------------------------------------------

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

  // res.json({ plants });
  res.json({
    plants: plants.map((plant) => plant.toObject({ getters: true })),
  });
};

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
