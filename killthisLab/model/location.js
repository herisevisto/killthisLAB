const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationID: String,
  bldg: String
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;