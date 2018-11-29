const mongoose = require('mongoose');

const MoASchema = new mongoose.Schema({
  shortName: String,
  name: { type: String, required: true },
  color: { type: String, required: true },
  usageStart: Number,
  usageEnd: Number
});

module.exports = mongoose.model('MoA', MoASchema);
