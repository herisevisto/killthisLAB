const express = require("express"); 
const app = express.Router();
const path = require('path');
const User = require('../../model/user.model')
const UserDetails = require('../../model/userDetails')
const Seats = require('../../model/seats')

//overlays
app.get('/accountcreated', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/accountcreated.html'));
});
app.get('/delete-acc-confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/delete-acc-confirmation.html'));
});
/*
app.get('/delete-account', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlays/delete-account.html'));
});
*/
app.get('/delete-account', async (req, res) => {
    const userID = req.query.userID
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        //Find User Account
        const user =  await User.findOne({userID: userID})
        
        //Find User Details
        const userDetails = await UserDetails.findOne({userID: userID})

        //Find Seats that the user booked
        const seats = await Seats.find({ name: user.firstName });
        const seatIDs = seats.map(seat => seat.seatID)
        console.log(user, userDetails, seats)
        res.render('overlay/delete-account', {user, userDetails, seats}); // Render the HBS template
    }catch (err){
        console.error('Error fetching users')
    }
});
app.get('/delete-photo', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/delete-photo.html'));
});
app.get('/pwchanged', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/pwchanged.html'));
});
app.get('/save-photo', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/save-photo.html'));
});
app.get('/save-profile', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/save-profile.html'));
});
app.get('/unsavedchanges', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/overlay/unsavedchanges.html'));
});

module.exports = app;