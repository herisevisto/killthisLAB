const Users = require('../model/user.model');
const path = require('path');
const fs = require('fs');

async function getUsers(){
    try{
      const users = await Users.find();
      //console.log('Fetched users from database:', users); // Log the fetched data
      return users
    } catch (err) {
      console.error('Error fetching User');
    }
}

module.exports = {getUsers};