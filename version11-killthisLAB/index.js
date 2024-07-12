require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const fs = require("fs");
const hbs = require("hbs");
const session = require("express-session");
const flash = require("connect-flash");

const authRoute = require("./routes/auth.routes");
const initializePassport = require("./passport/local.strategy");
app.use(express.json());

// Serve static files
// app.use("/styles", express.static(path.join(__dirname, "./public/styles")));
// app.use("/images", express.static(path.join(__dirname, "./public/images")));
app.use(express.static("public"));

/* Define routes */
//Directory route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/main/index.html"));
});

const mainRoute = require("./routes/main");
const homeRoute = require("./routes/home");
const overlayRoute = require("./routes/overlay");
const scriptRoute = require("./routes/script");
const locationRoute = require("./routes/locationRts");
const classRoute = require("./routes/classRts");
const seatRoute = require("./routes/seatRts");

// Create mongodb connection (not yet implemented)
const mongoose = require("mongoose");
const User = require("./model/user.model");
mongoose.connect('mongodb://localhost:27017/killthislab');

// Set view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Setup AUTH

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport(app);
app.use(flash());

// END: AUTH
app.use("/main", mainRoute);
app.use("/home", homeRoute);
app.use("/overlay", overlayRoute);
app.use("/script", scriptRoute);
app.use("/location", locationRoute);
app.use("/class", classRoute);
app.use("/seat", classRoute);
app.use("/auth", authRoute);

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
