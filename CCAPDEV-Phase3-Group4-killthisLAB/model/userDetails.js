const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: Number,
    userDescription: String,
    userPicture: String,
    classID: [Number],
    reservationID: [Number],
    displayName: String,
    profileName: String
});

const UserDetails = mongoose.model("UserDetails", userSchema);

module.exports = UserDetails;
