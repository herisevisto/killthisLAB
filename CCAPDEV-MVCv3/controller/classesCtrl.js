const Classes = require('../model/class');
const path = require('path');
const fs = require('fs');

async function getAllClasses(){
    try{
      const classes = await Classes.find();
      console.log('Fetched classes from database:', classes);
      return classes
    } catch (err) {
      console.error('Error fetching Classes');
    }
}

module.exports = {getAllClasses};