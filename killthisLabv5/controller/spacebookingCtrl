const fs = require('fs');
const path = require('path');
const getAllSeats = require('./getAllSeats');

const classesFilePath = path.resolve(__dirname, '../model/classData.json');

async function getSpaceBooking(req, res) {
    const selectedClassID = req.query.classID;
    const seats = await getAllSeats(parseInt(selectedClassID, 10));

    try {
        const classesData = JSON.parse(fs.readFileSync(classesFilePath, 'utf8'));
        const selectedClass = classesData.find(cls => cls.classID == selectedClassID);

        if (!selectedClass) {
            throw new Error(`Class with ID ${selectedClassID} not found.`);
        }

        res.render('home/space-booking', { 
            selectedClass, 
            seats:JSON.stringify(seats) });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getSpaceBooking };