const express = require("express"); 
const app = express.Router();
const path = require('path');

//home folder
app.get('/editProfile', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/editProfile.html'));
});
app.get('/FAQs', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/FAQs.html'));
});
app.get('/guidelines', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/guidelines.html'));
});
app.get('/home-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/home-dashboard.html'));
});
app.get('/myProfile', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/myProfile.html'));
});
app.get('/receipts', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/receipts.html'));
});
app.get('/space-booking', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/space-booking.html'));
});
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/home/search.html'));
});

module.exports = app;