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
// Create (C in CRUD)
const createPlant = async (req, res, next) => {
  console.log('[POST]   /api/plants/');

  // --------------------------------------------
  check_errors(req, next);
  // --------------------------------------------

  // -This works because of the body-parser
  const { nickname, species, h2ofrequency } = req.body;

  // --------------------------------------------

  const createdPlant = new Plant({
    nickname,
    species,
    h2ofrequency,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator:
      req.userData.userId /* Placed on req object in check-auth middleware */,
  });

  console.log('createdPlant: ', createdPlant);

  // --------------------------------------------

  // -Before saving the plant, we must check whether
  //  the user-id we provided exists already.
  // -Only allow the creation of a new plant
  //  if the user is created with the corresponding ID.
  let user;

  try {
    // -We want to access the created property of our users
    //  and check whether the id we have for our logged in user
    //  is already stored in here.
    // -We want to check if the user id we have exists in the DB.
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError('Created plant failed, please try again.', 500);
    return next(error);
  }

  // -Handle if user is NOT in DB
  if (!user) {
    const error = new HttpError('Could nto find user for provided id', 404);
    return next(error);
  }

  console.log('user: ', user);

  // --------------------------------------------

  // -Since we now know that the user exists, we can do two things:
  //  --1. we can store or create the new document with our new plant
  //  --2. we can add the plant id to the corresponding user.

  try {
    //
    // -We need to be able to execute multiple operations that
    //  are not directly related to eachother.
    // -If creating the plant fails,
    //  or if storing the id of the plant in the user document fails
    //  independently of eachother, then we want to undo
    //  all operations
    //  (throw an error without changing anything in the documents).
    // -Only if both of these things succeed then we want to continue
    //  and then actually modify the documents in the DB.
    // -To achieve this, we need to use TRANSACTIONS and SESSIONS.
    // -The transaction allows us to perform multiple operations
    //  in isolation of eachother which allows for undoing the operations.
    // -The transactions are built on sessions.
    // -To work with the transaction we first must start a session.
    // -Then, we can initiate the transaction.
    // -Once the transaction is successful, the session is finished
    //  and these transactions are committed.
    // -With that, the plant created and the plant id is stored in
    //  our users document.
    //
    // -This is our current session that we want
    //  to start when we create the new plant.
    const sess = await mongoose.startSession();

    // -Since the session is now started, we can begin our transaction.
    sess.startTransaction();

    // -We now tell mongoose what we want to do here.
    // -What we want to do is to make sure that the created
    //  plant should be saved in the DB.
    await createdPlant.save({ session: sess });

    // -Now that the plant has been created,
    //  we need to make sure that the plant id
    //  is also added to the user.
    user.plants.push(createdPlant);
    // -This .push() method is not the standard push() in JS.
    // -.push() here is a special method used by mongoose
    //  that allows mongoose to behind the scenese
    //  establish a connection between the two models
    //  we are using here.
    // -IMPORTANT: Behind the scenes, mongodb
    //             grabs the created plant ID
    //             (that is an integraged mongoose feature)
    //             and adds it to the plants field of the user.
    //             It only adds the plants ID.

    // -With that, we stored the plant and added the plants ID to the user.
    // -We now need to save the newly updated user.
    // -This updated user should be part of our current session that we are referring to.
    await user.save({ session: sess });

    // -Finally, if all these task are successful
    //  (we could create the plant,
    //   we could add the plant id,
    //   and we could save the user)
    //  then, we want to make sure that
    //  the session commits the transaction.
    await sess.commitTransaction();

    // -It is only at this point that the changes are actually
    //  saved into the DB.
    // -If anything went wrong in the tasks that are
    //  part of this transaction / session
    //  then all changes would have been rolled back by mongoDB.

    //
  } catch (err) {
    const error = new HttpError(
      'Creating plant failed, please try again.',
      500
    );
    return next(error);
  }

  // --------------------------------------------

  // DUMMY_PLANTS.push(createdPlant);
  try {
    console.log('createPlant, createdPlant try{}');
    // const x = await createdPlant.save(); // save() creates a unique id
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

exports.createPlant = createPlant;
