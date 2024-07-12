const express = require("express");
const app = express.Router();
const path = require("path");
const isLoggedIn = require("../middlewares/isLoggedIn");

//home folder
app.get("/editProfile", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/editProfile.html"));
});
app.get("/FAQs", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/FAQs.html"));
});
app.get("/guidelines", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/guidelines.html"));
});
app.get("/home-dashboard", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/home-dashboard.html"));
});
app.get("/myProfile", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/myProfile.html"));
});
app.get("/receipts", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/receipts.html"));
});
app.get("/space-booking", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/space-booking.html"));
});
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/home/search.html"));
});

module.exports = app;
