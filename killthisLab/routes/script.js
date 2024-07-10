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
app.post('/handleLocationOption', (req, res) => {
    res.sendFile(path.join(__dirname, './../controller/locationLstnrCtrl.js'));
});
app.get('/locationLstnr', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/locationLstnr.js'));
});
app.get('/space-booking', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/space-booking.js'));
});


module.exports = app;