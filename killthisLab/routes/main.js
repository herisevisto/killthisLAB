const express = require("express"); 
const app = express.Router();
const path = require('path');
const User = require('../model/login-labtech');

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

// Login Route
app.post('/login-labtech', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.redirect('/home/home-dashboard.html');
        } else {
            res.status(401).send('Invalid login credentials');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = app;
