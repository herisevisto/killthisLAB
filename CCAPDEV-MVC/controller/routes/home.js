const express = require("express"); 
const app = express.Router();
const path = require('path');
const { getSpaceBooking } = require("../spacebookingCtrl");
const User = require('../../model/user.model')
const { getAllClasses } = require('../classesCtrl')
const { getSeat, getAllSeats, updateSeats } = require('../getSeatsCtrl')

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


//home folder
app.get('/editProfile', async (req, res) => {
    const userID = req.query.userID
    console.log("EditProfile: ", userID)
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
app.get('/FAQs', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/home/FAQs.html'));
});
app.get('/guidelines', (req, res) => {
    res.sendFile(path.join(__dirname, './../../views/home/guidelines.html'));
});
app.get('/home-dashboard', async (req, res) => {
    const userID = req.query.userID
    console.log("UserID: ", userID)
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
app.get('/myProfile', async (req, res) => {
    const userID = req.query.userID
    console.log("MyProfile: ", userID)
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
        res.render('home/myProfile',{user})
    }catch (err){
        console.error('Error fetching users')
    }
})
app.get('/receipt', async (req, res) => {
    const userID = req.query.userID
    const classID = req.query.classID
    const seatID = req.query.seatID ? req.query.seatID.split(',') : [];
    //console.log("Received seatID", seatID)
    //console.log("Receipt: ", classID, userID, seatIDs)
    if (!classID){
        console.log("Class Not Found")
        return res.status(400).send({message: 'ClassID is required'})
    }
    if (!userID){
        console.log("User Not Found")
        return res.status(400).send({message: 'UserID is required'})
    }
    try{
        const user =  await User.findOne({userID: userID})
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
        await updateSeats(seatID, user)

        // Create Reservation Data
        const reservationData = {
            receiptID: receipt.receiptID,
            userID: user.userID,
            className: selectedClass.className,
            section: selectedClass.section,
            bldg: selectedClass.bldg,
            seatIDs: seatID
        }
        const reservation = await createReservation(reservationData)

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
app.get('/reservation', async (req, res) => {
    const userID = req.query.userID
    console.log("Reservation: ", userID)
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
app.get('/search', async (req, res) => {
    const userID = req.query.userID
    console.log("Search: ", userID)
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
app.get('/space-booking', getSpaceBooking)

module.exports = app;