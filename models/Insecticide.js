const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsecticideSchema = new mongoose.Schema({
  name: { type: String, require: true },  // BRAND NAME
  activeIngredient: { type: Schema.Types.ObjectId, ref: 'ActiveIngredient' },
  company: String,
  concentration: String,
  formulationType: String,
  min: Number,
  max: Number,
  unit: String
});

module.exports = mongoose.model('Insecticide', InsecticideSchema);
