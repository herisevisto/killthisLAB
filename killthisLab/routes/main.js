const express = require("express"); 
const app = express.Router();
const path = require('path');

// main folder
app.get('/home-main', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/home.html'));
});
app.get('/create-new-pw', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/create-new-pw.html'));
});
app.get('/forgot-pw', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/forgot-pw.html'));
});
app.get('/login-labtech', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/login-labtech.html'));
});
app.get('/login-student', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/login-student.html'));
});
app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/sign-up.html'));
});
app.get('/verify-otp', (req, res) => {
    res.sendFile(path.join(__dirname, './../view/main/verify-otp.html'));
});

module.exports = app;