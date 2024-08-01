const express = require('express');
const router = express.Router();
const locationController = require('../locationCtrl')
const classController = require('../classesCtrl')

router.get('/locations', locationController.getAllLocations)
router.get('/classes', async (req, res) => {
    try {
        const classes = await classController.getAllClasses();
        res.json(classes);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
