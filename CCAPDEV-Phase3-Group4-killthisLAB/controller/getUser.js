const Users = require('../model/user.model');
const path = require('path');

async function getUsers(){
    try{
      const users = await Users.find();
      return users
    } catch (err) {
      console.error('Error fetching User');
    }
}

module.exports = {getUsers};