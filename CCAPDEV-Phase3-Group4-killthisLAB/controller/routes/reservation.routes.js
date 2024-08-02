const express = require('express');
const router = express.Router();
const { deleteReservation } = require('../reservationCRUD');

// Route to delete a reservation
router.delete('/reservation/:id', async (req, res) => {
    const reservationID = req.params.id;
    try {
        await deleteReservation(reservationID);
        res.status(200).send({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting reservation', error });
    }
});

module.exports = router;
 