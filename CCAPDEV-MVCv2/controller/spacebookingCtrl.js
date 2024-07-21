const fs = require('fs');
const path = require('path');
const { getAllSeats } = require('./getSeatsCtrl');
const { getAllClasses } = require('./classesCtrl')
const { getUsers } = require('./getUser')

async function getSpaceBooking(req, res) {
    const selectedClassID = req.query.classID;
    const userID = req.query.userID
    console.log("ClassID and userID:", selectedClassID, userID)
    
    try {
        const classes = await getAllClasses()
        const users = await getUsers()
        const seats = await getAllSeats(selectedClassID)
        const selectedClass = classes.find(cls => cls.classID == selectedClassID)
        const user = users.find(user => user.userID == userID)
        
        if (!selectedClass) {
            throw new Error(`Class with ID ${selectedClassID} not found.`);
        }
        if (!user) {
            throw new Error(`User with ID ${userID} not found.`);
        }
        console.log("User: ", user)
        res.render('home/space-booking', { 
            selectedClass, 
            user,
            seats:JSON.stringify(seats),
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getSpaceBooking };