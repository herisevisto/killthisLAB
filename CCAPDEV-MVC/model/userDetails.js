const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: Number,
    userDescription: String,
    userPicture: String
});

const UserDetails = mongoose.model("UserDetails", userSchema);

module.exports = UserDetails;
