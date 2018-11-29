const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActiveIngredientSchema = new mongoose.Schema({
  name: { type: String, require: true },
  moa: [{ type: Schema.Types.ObjectId, ref: 'MoA' }],
  uses: String,
  phi: Number,
  targetPests: [{ type: Schema.Types.ObjectId, ref: 'Pest' }]
});

module.exports = mongoose.model('ActiveIngredient', ActiveIngredientSchema);