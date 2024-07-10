const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationCtrl');

router.get('/locations', locationController.getAllLocations);;

module.exports = router;
