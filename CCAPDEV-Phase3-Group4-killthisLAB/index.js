require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const fs = require("fs");
const hbs = require("hbs");
const session = require("express-session");
const flash = require("connect-flash");
const reservationRoute = require('./controller/routes/reservation.routes');


app.use('/reservation', reservationRoute);


const authRoute = require("./controller/routes/auth.routes");
const initializePassport = require("./controller/local.strategy");
app.use(express.json());

// Serve static files
app.use(express.static("public"));

/* Define routes */
//Directory route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/main/index.html"));
});

const mainRoute = require("./controller/routes/main");
const homeRoute = require("./controller/routes/home");
const overlayRoute = require("./controller/routes/overlay");
const scriptRoute = require("./controller/routes/script");
const locationRoute = require("./controller/routes/locationRts");
const dataRoute = require("./controller/routes/dataRts");
const adminRoute = require("./controller/routes/admin");

// Create mongodb connection (not yet implemented)
const mongoose = require("mongoose");
const User = require("./model/user.model");
mongoose.connect('mongodb://localhost:27017/killthislab');

// Set view engine
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));


hbs.registerHelper('toLocale', function (date) {
  if (date) {
    return new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  }
  return '';
});
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
app.use("/auth", authRoute);
app.use("/data", dataRoute);
app.use("/admin", adminRoute);

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
