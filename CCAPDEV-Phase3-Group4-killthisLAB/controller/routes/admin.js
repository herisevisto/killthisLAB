const express = require("express");
const router = express.Router();
const User = require('../../model/user.model')
const Classes = require('../../model/class')
const Reservations = require('../../model/reservation')
const UserDetails = require('../../model/userDetails')
const Seats = require('../../model/seats')
const Receipts = require('../../model/receipts')
const { getAllClasses } = require('../classesCtrl')
const { getSeat, getAllSeats, updateSeats, removeUserSeats } = require('../getSeatsCtrl')

//CRUD
const { createReceipt,
    getAllReceipts,
    updateReceipt,
    deleteReceipt } = require('../receiptCRUD')

const { createReservation,
    getAllReservation,
    getReservation,
    updateReservation,
    deleteReservation } = require('../reservationCRUD')

const { createuserDetails,
    getAlluserDetails,
    updateuserDetails,
    deleteuserDetails} = require('../userDetailsCRUD')


// admin folder
router.get("/dashboard", async (req, res) => {
    try{
        // Fetch all users from the database
        const users = await User.find({})
        const classes = await Classes.find({})
        const reservations = await Reservations.find({})
        const userCount = users.length
        const classCount = classes.length
        const resCount = reservations.length
        res.render('admin/dashboard',{users, userCount, classCount, resCount})
    }catch (err){
        console.error('Error fetching user')
    }
});
router.get("/seatbooking", async (req,res) => {
    const classID = req.query.classID
    const userIDs = req.query.userIDs.split(',')
    try{
        const classes = await getAllClasses()
        const classData = classes.find(cls => cls.classID == classID)
        const seats = await getAllSeats(classID)
        const users = await User.find({ userID: { $in: userIDs } });

        res.render('admin/seatbooking', { 
            classData, userIDs, 
            seats:JSON.stringify(seats), 
            users: JSON.stringify(users) });
    }catch (err){
        res.status(500).send('Server Error');
        console.error('Error fetching reservations:', err);
    }
})
router.get("/userData", async (req, res) => {
    try{
        const classID = req.query.classID
        const students = req.query.students
        const classData = await Classes.findOne({ classID: classID })

        console.log(students)
        res.render('admin/userData', {classID, students, classData})
    }catch (err){
        console.error('Error fetching user')
    }
});
router.get("/walk-in", async (req, res) => {
    try{
        res.render('admin/walk-in')
    }catch (err){
        console.error('Error fetching user')
    }
});
router.get("/editReservations", async (req, res) => {
    try{
        // Fetch all users from the database
        const users = await User.find({})
        const classes = await Classes.find({})
        const reservations = await Reservations.find({})
        const userCount = users.length
        const classCount = classes.length
        const resCount = reservations.length
        res.render('admin/editreservations',{users, userCount, classCount, resCount})
    }catch (err){
        console.error('Error fetching user')
    }
});
router.get('/receipt', async (req, res) => {
    const userIDs = req.query.userIDs ? req.query.userIDs.split(',') : [];
    const classID = req.query.classID
    const seatIDs = req.query.seatID ? req.query.seatID.split(',') : [];

    console.log("Users | Seats: ", userIDs.length, seatIDs.length)
    if (!classID){
        console.log("Class Not Found")
        return res.status(400).send({message: 'ClassID is required'})
    }
    if (userIDs.length === 0) {
        console.log("Users Not Found");
        return res.status(400).send({ message: 'At least one UserID is required' });
    }
    try{
        const classes = await getAllClasses();
        const selectedClass = classes.find(cls => cls.classID == classID);
        const allSeats = await getAllSeats(classID);
        const seats = allSeats.filter(seat => seatIDs.includes(seat.seatID.toString()));

        const users = await User.find({ userID: { $in: userIDs } });
        const userDetailsArray = await UserDetails.find({ userID: { $in: users.map(user => user.userID) } });

        if(!selectedClass){
            console.log('Class not found')
            return res.status(404).send({ message: 'Class not found' });
        }

        if (users.length === 0) {
            console.log('No users found');
            return res.status(404).send({ message: 'No users found' });
        }
        

        // CRUD OPERATIONS
        // Create Receipt Data
        const receipts = [];
        const reservations = [];
        const updatedUserDetails = [];
        let seatIndex = 0;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userDetails = userDetailsArray.find(detail => detail.userID === user.userID);

            if (!userDetails) {
                console.log(`User details not found for ${user.userID}`);
                continue;
            }

            // Create Receipt
            const receiptData = {
                className: selectedClass.className,
                classSection: selectedClass.section,
                seatID: seatIDs[i],
                studentID: user.userID
            };
            const receipt = await createReceipt(receiptData);
            receipts.push(receipt);

            // Create Reservation
            const reservationData = {
                receiptID: receipt.receiptID,
                userID: user.userID,
                classID: selectedClass.classID,
                className: selectedClass.className,
                section: selectedClass.section,
                bldg: selectedClass.bldg,
                seatIDs: seatIDs[i]
            };
            const reservation = await createReservation(reservationData);
            reservations.push(reservation);

            // Update UserDetails
            userDetails.reservationID.push(reservation.receiptID);
            userDetails.classID.push(selectedClass.classID);
            updatedUserDetails.push(userDetails);

            // Update Seats
            const seatID = seatIDs[i];
            if (seatID) {
                await updateSeats([seatID], userDetails);
                console.log("Seat Id Updated: ", seatID);
            }
        }

        const lastReceipt = receipts[receipts.length - 1];
        const createdAt = lastReceipt ? lastReceipt.createdAt : 'No Date Available';

        res.render('admin/receipt',{
            users,
            selectedClass,
            seats: seats,
            receipts, 
            createdAt
        })
    }catch (err){
        console.error('Error fetching receipt')
    }
})
router.get('/userReservation', async (req,res) => {
    try{
        const receiptID = parseInt(req.query.resID);
        const reservation = await Reservations.findOne({ receiptID });
        let seats = await getAllSeats(reservation.classID)
        seats = seats.filter(seat => seat.status === 'Available'); 
        if (!reservation) {
            return res.status(404).render('error', { message: 'Reservation not found' });
        }

        res.render('admin/reservation', { reservation, seats:JSON.stringify(seats), });
    }catch (error) {
        console.error('Error retrieving reservation:', error);
        res.status(500).render('error', { message: 'An error occurred', error });
    }
})


router.get('/getUserByID/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID); // Parse the userID from the URL parameter
        if (isNaN(userID)) {
            return res.status(400).json({ error: 'Invalid userID' });
        }

        // Fetch user from the database
        const user = await User.findOne({ userID: userID });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch reservations associated with the userID
        const reservations = await Reservations.find({ userID: userID });

        // Map reservations to class details
        const classDetails = reservations.map(reservation => ({
            className: reservation.className,
            section: reservation.section
        }));
        // Send the user data to the client
        res.json({user, classDetails});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/validateUserIDs', async (req, res) => {
    const userIDs = req.body.userIDs;
    console.log(userIDs)
    try {
        const users = await User.find({ userID: { $in: userIDs } });
        const validUserIDs = users.map(user => user.userID);
        if (userIDs.length !== validUserIDs.length) {
            return res.status(404).json({ error: 'One or more user IDs are not valid.' });
        }
        // Fetch reservations by userIDs
        const reservations = await Reservations.find({ userID: { $in: validUserIDs } });

        const userClassDetailsMap = reservations.reduce((acc, reservation) => {
            if (!acc[reservation.userID]) {
                acc[reservation.userID] = [];
            }
            acc[reservation.userID].push({
                className: reservation.className,
                section: reservation.section
            });
            return acc;
        }, {});

        const userDetails = users.map(user => {
            return {
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                classDetails: userClassDetailsMap[user.userID] || []
            };
        });

        res.json({ userDetails });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while validating user IDs.' });
    }
});

router.get('/getReservationsByID/:userID', async (req, res) => {
    try {
        const userID = parseInt(req.params.userID);
        // Fetch user from the database
        const user = await User.findOne({ userID: userID });
        const reservations = await Reservations.find({ userID });

        if (!user || !reservations.length) {
            return res.status(404).json({ message: 'User or reservations not found' });
        }

        res.json({ user, reservations });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

router.delete('/deleteReservation/:receiptID', async (req, res) => {
    try{
        const receiptID = parseInt(req.params.receiptID);
        console.log("ReceiptID: ", receiptID)
        // Find the reservation
        const reservation = await Reservations.findOne({ receiptID });
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        const { seatIDs, userID, classID } = reservation;

        // Update seat statuses
        if (seatIDs && seatIDs.length > 0) {
            for (let i = 0; i < seatIDs.length; i++) {
                await removeUserSeats(seatIDs[i]);
            }
        }

        // Update user details
        const user = await UserDetails.findOne({ userID });
        if (user) {
            if (user.reservationIDs) {
                user.reservationIDs = user.reservationIDs.filter(id => id !== receiptID);
            }
            if (user.classIDs) {
                user.classIDs = user.classIDs.filter(id => id !== classID);
            }
            await user.save();
        }

        // Delete the reservation
        await Reservations.deleteOne({ receiptID });
        res.json({ message: 'Reservation deleted successfully' });
        console.log("Reservation deleted successfully")
    }catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});

router.post('/changeSeats', async (req, res) => {
    const {  seats: newSeats, reservationID } = req.body;
    console.log('Change Seats: ', newSeats, reservationID)
    try {
        const reservation = await Reservations.findOne({ receiptID: reservationID });
        //Find the seats and update them to remove the users
        const oldSeats = reservation.seatIDs || [];
        if (oldSeats.length > 0) {
            for (let i = 0; i < oldSeats.length; i++) {
                console.log('Removing seat:', oldSeats[i]);
                await removeUserSeats(oldSeats[i]);
            }
        }

        // Find the reservation by receiptID and update the seatIDs
        reservation.seatIDs = newSeats;
        await reservation.save();

        //Update the new seats
        const userDetails = await UserDetails.findOne({ userID: reservation.userID });
        if (newSeats && newSeats.length > 0) {
            for (let i = 0; i < newSeats.length; i++) {
                await updateSeats([newSeats[i]], userDetails);
            }
        }

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json({ message: 'Seats updated successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/addSeats', async (req, res) => {
    const {  seats: newSeats, reservationID } = req.body;
    console.log('Add Seats: ', newSeats, reservationID)
    try {
        const reservation = await Reservations.findOne({ receiptID: reservationID });
        
        // Find the reservation by receiptID and update the seatIDs
        const existingSeats = reservation.seatIDs || [];
        const updatedSeats = [...new Set([...existingSeats, ...newSeats])];
        reservation.seatIDs = updatedSeats;
        await reservation.save();

        //Update the added seats
        const userDetails = await UserDetails.findOne({ userID: reservation.userID });
        if (newSeats && newSeats.length > 0) {
            for (let i = 0; i < newSeats.length; i++) {
                await updateSeats([newSeats[i]], userDetails);
            }
        }

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json({ message: 'Seats added successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
