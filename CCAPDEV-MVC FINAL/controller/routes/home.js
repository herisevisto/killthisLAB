const express = require("express"); 
const router = express.Router();
const { getSpaceBooking } = require("../spacebookingCtrl");
const User = require('../../model/user.model')
const UserDetails = require('../../model/userDetails')
const Reservations = require('../../model/reservation')
const Receipts = require('../../model/receipts')
const Seats = require('../../model/seats')
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

//home folder
// GET
router.get('/editProfile', async (req, res) => {
    const userID = req.query.userID
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }
        console.log("User: ", user)
        res.render('home/editProfile',{user})
    }catch (err){
        console.error('Error fetching users')
    }
})
router.get('/home-dashboard', async (req, res) => {
    const userID = req.query.userID
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }
        console.log("User: ", user)
        res.render('home/home-dashboard',{user})
    }catch (err){
        console.error('Error fetching users')
    }
})
router.get('/myProfile', async (req, res) => {
    const userID = req.query.userID
    console.log("MyProfile userID: ", userID)
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        const userDetails = await UserDetails.findOne({userID: userID})

        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }

        const classes = await getAllClasses()
        const reservedClasses = classes.filter(cls => userDetails.classID.includes(cls.classID));

        const formatDate = (date) => {
            const options = { month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        const currentDate = new Date()
        const upcomingClasses = reservedClasses
            .filter(cls => new Date(cls.date) >= currentDate)
            .map(cls => ({
                ...cls._doc,
                date: formatDate(cls.date)
            }))
        const pastClasses = reservedClasses
            .filter(cls => new Date(cls.date) < currentDate)
            .map(cls => ({
                ...cls._doc,
                date: formatDate(cls.date)
            }))

        console.log("User: ", user)
        console.log("User Details: ", userDetails)
        console.log("Upcoming Classes: ", upcomingClasses);
        console.log("Past Classes: ", pastClasses);
        res.render('home/myProfile',{user, userDetails, upcomingClasses, pastClasses})
    }catch (err){
        console.error('Error fetching user')
    }
})
router.get('/showProfile', async (req, res) => {
    const userID = req.query.userID
    const viewID = req.query.viewID

    console.log("Profile: ", userID)
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        const view =  await User.findOne({userID: viewID})
        const userDetails = await UserDetails.findOne({userID: viewID})
        
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }

        const classes = await getAllClasses()
        const reservedClasses = classes.filter(cls => userDetails.classID.includes(cls.classID));

        const formatDate = (date) => {
            const options = { month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        const currentDate = new Date()
        const upcomingClasses = reservedClasses
            .filter(cls => new Date(cls.date) >= currentDate)
            .map(cls => ({
                ...cls._doc,
                date: formatDate(cls.date)
            }))
        const pastClasses = reservedClasses
            .filter(cls => new Date(cls.date) < currentDate)
            .map(cls => ({
                ...cls._doc,
                date: formatDate(cls.date)
            }))

        console.log("User: ", user)
        console.log("User Details: ", userDetails)
        console.log("Upcoming Classes: ", upcomingClasses);
        console.log("Past Classes: ", pastClasses);
        res.render('home/showProfile',{user, view, userDetails, upcomingClasses, pastClasses})
    }catch (err){
        console.error('Error fetching user')
    }
})
router.get('/receipt', async (req, res) => {
    const userID = req.query.userID
    const classID = req.query.classID
    const seatID = req.query.seatID ? req.query.seatID.split(',') : [];
    const reservationType = req.query.resType; 

    if (!classID){
        console.log("Class Not Found")
        return res.status(400).send({message: 'ClassID is required'})
    }
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    if (!reservationType) {
        console.log("Reservation Type Not Found");
        return res.status(400).send({ message: 'ReservationType is required' });
    }

    try{
        const user =  await User.findOne({userID: userID})
        const userDetails = await UserDetails.findOne({userID: user.userID})
        const classes = await getAllClasses()
        const selectedClass = classes.find(cls => cls.classID == classID)
        const allSeats = await getAllSeats(classID)
        
        const seats = allSeats.filter(seat=> seatID.includes(seat.seatID.toString()))

        console.log("Receipt: ", seats)
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }
        if(!selectedClass){
            console.log('Class not found')
            return res.status(404).send({ message: 'Class not found' });
        }

        // CRUD OPERATIONS
        // Create Receipt Data
        const receiptData = {
            className: selectedClass.className,
            classSection: selectedClass.section,
            seatID: seats.map(seat => seat.seatID),
            studentID: user.userID
        }
        const receipt = await createReceipt(receiptData)

        // Update seat
        await updateSeats(seatID, userDetails, reservationType)
        
        // Create Reservation Data
        const reservationData = {
            receiptID: receipt.receiptID,
            userID: user.userID,
            classID: selectedClass.classID,
            className: selectedClass.className,
            section: selectedClass.section,
            bldg: selectedClass.bldg,
            seatIDs: seatID
        }
        const reservation = await createReservation(reservationData)

        // Update UserDetails Data with reservations
        
        if(userDetails){
            userDetails.reservationID.push(reservation.receiptID)
            userDetails.classID.push(selectedClass.classID)
            await userDetails.save()
            console.log("Updated user details: ", userDetails)
        }
        else{
            console.log("User not found")
        }

        console.log("User: ", user)
        res.render('home/receipt',{
            user,
            selectedClass,
            seats: seats,
            receipt
        })
    }catch (err){
        console.error('Error fetching receipt')
    }
})
router.get('/reservation', async (req, res) => {
    const userID = req.query.userID
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }
        // Fetch reservation per userID
        const reservations = await getReservation(user.userID)

        console.log("User: ", user)
        console.log("Reservation: ", reservations)
        res.render('home/reservation',{
            user,
            reservations
        })
    }catch (err){
        console.error('Error fetching users')
    }
})
router.get('/search', async (req, res) => {
    const userID = req.query.userID
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
        if(!user){
            console.log('User not found')
            return res.status(404).send({ message: 'User not found' });
        }
        console.log("User: ", user)
        res.render('home/search',{user})
    }catch (err){
        console.error('Error fetching users')
    }
})
router.get('/space-booking', getSpaceBooking)

// POST
router.post('/updateUserDetails', async (req, res) => {
    const { displayName, description } = req.body;
    const userID = req.query.userID; 

    if (!userID) {
        return res.status(400).send({ message: 'UserID is required' });
    }

    try {
        // Find the user and update their details
        const userDetails = await UserDetails.findOneAndUpdate(
            { userID: userID },
            { displayName: displayName, userDescription: description },
            { new: true } 
        );

        if (!userDetails) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User details updated successfully' });
    } catch (err) {
        console.error('Error updating user details:', err);
        res.status(500).send({ message: 'Server error' });
    }
});
router.post('/deleteUser', async(req, res) => {
    const userID = req.query.userID;
    console.log("Delete ID: ", userID)

    if (!userID) {
        return res.status(400).send({ message: 'UserID is required' });
    }
    
    try {
        //Delete User Details
        await UserDetails.deleteOne({userID: userID})
        
        //Delete Reservation
        await Reservations.deleteMany({ userID: userID })
        
        //Delete Receipts
        await Receipts.deleteMany({ studentID: userID })
        
        //Update Seats that the user booked
        const seats = await Seats.find({userID: userID})
        if (seats.length > 0) {
            await Seats.updateMany(
                { userID: userID },
                {
                    $set: {
                        userID: null,
                        status: 'Available',
                        name: 'Name'
                    }
                }
            );
        }
        // Delete User
        await User.deleteOne({ userID: userID });
        res.status(200).json({ message: 'Account successfully deleted.' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Failed deleting account.' });
    }
})
module.exports = router;