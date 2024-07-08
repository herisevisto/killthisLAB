const express = require("express"); 
const app = express.Router();
const path = require('path');

// Scripts
app.get('/tab', (req, res) => {
    res.sendFile(path.join(__dirname, '../../model/tab.js'));
});
app.get('/space-booking', (req, res) => {
    res.sendFile(path.join(__dirname, '../../model/space-booking.js'));
});

module.exports = app;