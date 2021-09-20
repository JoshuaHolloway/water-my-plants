const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  nickname: { type: String, required: true },
  species: { type: String, required: true },
  image: { type: String, required: true },
  // h2oFrequency: { type: String, required: true }, // number?
  // creator: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

// {
//   id: 'p1', // o  id
//   nickname: 'plant A', // o  Nickname
//   species: 'species A', // o  Species
//   h2oFrequency: 1, // o  h20Frequency [units???]
//   image: '', // o  Image.
//   creator: 'u1',
// },

// 1st arg defines name of model
module.exports = mongoose.model('Plant', plantSchema);
