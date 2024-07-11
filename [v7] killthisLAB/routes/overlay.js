const express = require("express"); 
const app = express.Router();
const path = require('path');

//overlays
app.get('/accountcreated', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/accountcreated.html'));
});
app.get('/delete-acc-confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/delete-acc-confirmation.html'));
});
app.get('/delete-account', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/delete-account.html'));
});
app.get('/delete-photo', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/delete-photo.html'));
});
app.get('/pwchanged', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/pwchanged.html'));
});
app.get('/save-photo', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/save-photo.html'));
});
app.get('/save-profile', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/save-profile.html'));
});
app.get('/unsavedchanges', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/overlays/unsavedchanges.html'));
});

module.exports = app;