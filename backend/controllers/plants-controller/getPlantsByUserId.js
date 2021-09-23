// NOTE: plants collection must be created in advance on in the DB
//       due to transactions / sessions not being able to
//       create a collection on-the-fly.

const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const check_errors = require('../checkErrors');

const Plant = require('../../models/plant');
const User = require('../../models/user');

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

exports.getPlantsByUserId = getPlantsByUserId;
