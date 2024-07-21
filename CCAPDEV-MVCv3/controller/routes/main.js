const express = require("express");
const router = express.Router();
const path = require("path");

// main folder
router.get("/home-main", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/home.html"));
});
router.get("/create-new-pw", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/create-new-pw.html"));
});
router.get("/forgot-pw", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/forgot-pw.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/login.html"));
});
router.get("/login-labtech", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/login-labtech.html"));
});
router.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/sign-up.html"));
});
router.get("/verify-otp", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../views/main/verify-otp.html"));
});

module.exports = router;
