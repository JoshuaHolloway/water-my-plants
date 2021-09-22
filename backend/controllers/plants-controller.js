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
const createPlant = async (req, res, next) => {
  console.log('[POST]   /api/plants/');

  // --------------------------------------------
  check_errors(req, next);
  // --------------------------------------------

  // -This works because of the body-parser
  const { /*id, */ nickname, species, h2ofrequency, /* image, */ creator } =
    req.body;

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
    // h2ofrequency,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator /* Dummy String in development */,
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
    user = await User.findById(creator);
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

const deletePlant_non_transaction = async (req, res, next) => {
  const plantId = req.params.pid;
  console.log(`[DELETE] /api/plants/${plantId}`);

  // // -Check to ensure the plant we are trying
  // //  to delete actually exists before
  // //  deleting it.
  // if (!DUMMY_PLANTS.find((p) => p.id === plantId)) {
  //   throw new HttpError('Could not find a plant for that id', 404);
  // }
  // console.log('DUMMY_PLANTS (before deletion): ', DUMMY_PLANTS);
  // // -overwrite original array with new array (immutably)
  // DUMMY_PLANTS = DUMMY_PLANTS.filter((p) => p.id !== plantId);
  // console.log('DUMMY_PLANTS (after deletion): ', DUMMY_PLANTS);

  let plant;
  try {
    plant = await Plant.findById(plantId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete plant.',
      500
    );
    return next(error);
  }

  try {
    await plant.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete plant.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'deleted plant.' });
};

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

// module.exports;
exports.getPlantById = getPlantById;
exports.getPlantsByUserId = getPlantsByUserId;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;
