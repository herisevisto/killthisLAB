const express = require('express');
const fs = require('fs');
const app = express();

const path = require('path');

app.use(express.json());

function saveSeatsData(seatsData) {
    const seatsFilePath = path.join(__dirname, '../model/seats.json');

    // Write seatsData to seats.json
    fs.writeFile(seatsFilePath, JSON.stringify(seatsData, null, 2), (err) => {
        if (err) {
            console.error('Error writing seats.json:', err);
        } else {
            console.log('Seats.json updated successfully!');
        }
    });
}

async function generateSeatsData(rows, cols, classID){
    const seats = [];
    let seatID = 50001;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            seats.push({
                seatID: seatID++,
                classID: classID,
                rowNo: row,
                colNo: col,
                status: 'Available'
            });
        }
    }

    return seats;
}

const seatsJson = path.join(__dirname, '../model/seats.json'); 

async function getAllSeats(classID){
    fs.readFile(seatsJson, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading classes JSON file:', err);
            res.status(500).json({ error: 'Failed to read classes data' });
            return;
        }
        
        const seats = JSON.parse(data);
        return seats;
        res.json(seats);
    });
}

async function getSelectedClass(classID){
    try{
        const seatsData = JSON.parse(fs.readFileSync(seatsFilePath, 'utf8'));
        const seatsForClass = seatsData.filter(sts => sts.classID === classID);
        console.log("Seats", seatsForClass);
        return seatsForClass;
    } catch(error){
        console.error('Error reading seats.json:', error.message);
    }
}
module.exports = {
    generateSeatsData,
    saveSeatsData,
    getAllSeats,
    getSelectedClass
};