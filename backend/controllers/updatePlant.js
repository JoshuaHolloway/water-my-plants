// NOTE: plants collection must be created in advance on in the DB
//       due to transactions / sessions not being able to
//       create a collection on-the-fly.

const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const check_errors = require('./checkErrors');

const Plant = require('../models/plant');
const User = require('../models/user');
const user = require('../models/user');

const updatePlant = async (req, res, next) => {
  // --------------------------------------------
  check_errors(req, next);
  // --------------------------------------------

  const { /*id, */ nickname, species /*, h2ofrequency, image, creator */ } =
    req.body;

  const plantId = req.params.pid;

  // const updatePlant = DUMMY_PLANTS.find(p => p.id === plantId);

  // -update in an immutable way
  // (Bad Practice [mutable]): updatePlant.nickname = nickname;

  // // -{ ...x} creates a new object and copies all key-value pairs
  // //  of the old object into the new object.
  // const updatedPlant = { ...DUMMY_PLANTS.find((p) => p.id === plantId) };
  // const plantIndex = DUMMY_PLANTS.findIndex((p) => p.id === plantId);
  // updatedPlant.nickname = nickname;
  // updatedPlant.species = species;
  // DUMMY_PLANTS[plantIndex] = updatedPlant;

  let plant;
  try {
    plant = await Plant.findById(plantId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update plant.',
      500
    );
    return next(error);
  }

  plant.nickname = nickname;
  plant.species = species;

  console.log('DEBUG');
  console.log('plant: ', plant);

  try {
    await plant.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update plant.',
      500
    );
    return next(error);
  }

  // -200: Success without creating a new resource
  // res.status(200).json({ plant: updatedPlant });
  res.status(200).json({ plant: plant.toObject({ getters: true }) });
};
// ==============================================

exports.updatePlant = updatePlant;
