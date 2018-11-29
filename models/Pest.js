const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PestSchema = new mongoose.Schema({
  name: { type: String, require: true }, // Scientific Name
  alternateNames: [String],
  image: String,
  imageVersion: String,
  attackStart: Number,
  attackEnd: Number
});

module.exports = mongoose.model('Pest', PestSchema);
