const express = require("express"); 
const app = express.Router();
const path = require('path');
const { getSpaceBooking } = require("../controller/spacebookingCtrl");

//home folder
app.get('/editProfile', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/editProfile.html'));
});
app.get('/FAQs', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/FAQs.html'));
});
app.get('/guidelines', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/guidelines.html'));
});
app.get('/home-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/home-dashboard.html'));
});
app.get('/myProfile', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/myProfile.html'));
});
app.get('/receipts', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/receipts.html'));
});
//app.get('/space-booking', (req, res) => {
//    res.sendFile(path.join(__dirname, './../views/home/space-booking.html'));
//});
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/home/search.html'));
});

app.get('/space-booking', getSpaceBooking)

module.exports = app;