const Location = require('../model/location');
const path = require('path');
const fs = require('fs');

exports.getAllLocations = async (Req, res) =>{
    try{
      const locations = await Location.find();
      console.log('Fetched locations from database:'); // Log the fetched data
      res.json(locations);
    } catch (err) {
      console.error('Error fetching locations');
    }
}