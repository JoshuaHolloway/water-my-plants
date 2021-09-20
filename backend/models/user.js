const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// ==============================================

const Schema = mongoose.Schema;

// ==============================================

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  // image: { type: String, required: true },
  // plants: { type: String, required: true },
  plants: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Plant' }],
  // -One user can have multiple plants
  // -Therefore, need an array to tell
  //  mongoose that documents based on this schema
  //  we have multiple plants entries.
});

// ==============================================

// -Ensure we have a unique email
userSchema.plugin(uniqueValidator);

// ==============================================

// -model([name-of-model], schema)
module.exports = mongoose.model('User', userSchema);
