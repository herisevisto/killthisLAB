const express = require('express');
const router = express.Router();
const seatsCtrl = require('../controller/seatsCtrl');

router.post('/updateSeats', (Req,res) => {
    const seatsData = req.body;
    seatsCtrl.saveSeatsData(seatsData);

    res.json({ message: 'Seats generated and saved successfully' });
});

router.get('/getAllSeats', seatsCtrl.getAllSeats);

module.exports = router;