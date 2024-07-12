const fs = require('fs');
const path = require('path');

const seatsFilePath = path.resolve(__dirname, '../model/seats.json');

async function getAllSeats(classID) {
    try {
        const seatsData = JSON.parse(fs.readFileSync(seatsFilePath, 'utf8'));
        const seatsForClass = seatsData.filter(sts => sts.classID === classID);
        console.log("Seats: ", seatsForClass)
        return seatsForClass;
    } catch (error) {
        console.error('Error reading seats.json:', error.message);
        throw error;
    }
}

module.exports = getAllSeats;