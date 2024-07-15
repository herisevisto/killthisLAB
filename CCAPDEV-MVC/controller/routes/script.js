const express = require("express"); 
const app = express.Router();
const path = require('path');

// Scripts
app.get('/tab', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/tab.js'));
});
app.get('/assignLocation', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/assignLocation.js'));
});
app.get('/allocateClass', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/allocateClass.js'));
});
app.get('/space-booking', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/space-booking.js'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/login.js'));
});
app.get('/receipt', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/receipt.js'));
});


module.exports = app;