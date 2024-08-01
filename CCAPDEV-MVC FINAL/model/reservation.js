const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    receiptID: Number,
    userID: Number,
    classID: Number,
    className: String,
    section: String,
    bldg: String,
    seatIDs: [Number],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ReservationDetails = mongoose.model("Reservations", reservationSchema);

module.exports = ReservationDetails;
