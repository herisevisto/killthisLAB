const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  seatID: Number,
  classID: Number,
  userID: Number,
  rowNo: Number,
  colNo: Number,
  status: String,
  name: String,
});

const Seats = mongoose.model('Seats', seatsSchema);

module.exports = Seats;