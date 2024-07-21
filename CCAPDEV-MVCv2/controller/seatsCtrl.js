const Seats = require('../model/seats');
const path = require('path');
const fs = require('fs');

const getAllSeats = async (Req, res) =>{
    try{
      const seats = await Seats.find();
      console.log('Fetched seats from database:', seats); // Log the fetched data
      res.json(seats);
    } catch (err) {
      console.error('Error fetching Seats');
    }
}

const updateSeats = async (seatID, updateData) => {
  try {
    const seat = await Seats.findByIdAndUpdate(seatID, updateData, { new: true })
    return seat
  } catch (error) {
    console.error('Error updating seat:', error)
    throw error
  }
}

module.exports = {
  getAllSeats,
  updateSeats
}