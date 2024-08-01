const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    receiptID: Number,
    className: String,
    classSection: String,
    seatID: [Number],
    studentID: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Receipts = mongoose.model("Receipts", receiptSchema);

module.exports = Receipts;
