const express = require("express"); 
const router = express.Router();
const path = require('path');

// Scripts
router.get('/tab', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/tab.js'));
});
router.get('/assignLocation', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/assignLocation.js'));
});
router.get('/allocateClass', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/allocateClass.js'));
});
router.get('/space-booking', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/space-booking.js'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/login.js'));
});
router.get('/receipt', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/receipt.js'));
});
router.get('/login-labtech', (req, res) => {
    res.sendFile(path.join(__dirname, './../scripts/login-labtech.js'));
});

module.exports = router;