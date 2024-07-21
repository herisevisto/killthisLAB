const express = require('express');
const router = express.Router();
const locationController = require('../locationCtrl');

router.get('/locations', locationController.getAllLocations);;

module.exports = router;
