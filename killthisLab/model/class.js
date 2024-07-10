const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classID: Number,
    bldg: String,
    section: String,
    className: String,
    floor: Number,
    rows: Number,
    cols: Number,
    date: Date,
    time: String,
    capacity: Number,
});

const Class = mongoose.model('Classes', classSchema);

module.exports = Class;