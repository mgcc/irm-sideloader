
const mongoose = require('mongoose')

// Initialize mongoose
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/experiments',
  {
    useNewUrlParser: true
  },
  (err) => {
  if (err) { console.log('Error connecting to MongoDB'); }
});

// Register models
require('./models/Pest')
require('./models/MoA');
require('./models/ActiveIngredient');
require('./models/Insecticide');


const parser = require('./parser');

parser.ai();