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

const deletePlant = async (req, res, next) => {
  const plantId = req.params.pid;

  let plant;
  try {
    plant = await Plant.findById(plantId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete plant.',
      500
    );
    return next(error);
  }

  if (!plant) {
    const error = new HttpError('Could not find plant for this id.', 404);
    return next(error);
  }

  // --------------------------------------------
  // -Authoriztion
  // -plant.creator is the entire User
  //  object due to the .populate('creator')
  //  method invocation in this controller.
  // -Contrast that with the .creator
  //  property being simply the id
  //  as scene in the upldatePlant() controller.
  if (plant.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this plant.',
      401
    );
    return next(error);
  }
  // --------------------------------------------

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await plant.remove({ session: sess });

    plant.creator.plants.pull(plant);
    await plant.creator.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete plant.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted plant.' });
};

// ==============================================

exports.deletePlant = deletePlant;
