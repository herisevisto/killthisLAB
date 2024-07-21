const express = require('express');
const router = express.Router();
const locationController = require('../locationCtrl')
const classController = require('../classesCtrl')
const seatController = require('../seatsCtrl')
//const userController = require('../getUser')

router.get('/locations', locationController.getAllLocations)
router.get('/classes', async (req, res) => {
    try {
        const classes = await classController.getAllClasses();
        res.json(classes); // Send the classes data as JSON response
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/seats', seatController.getAllSeats)
//router.get('/user', userController.getUser)

module.exports = router;
